from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import db_helper
import generic_helper
app = FastAPI()

inprogress_orders = {}

@app.post("/")
async def handle_request(request: Request):
    try:
        # Retrieve the JSON data from the request
        payload = await request.json()

        # Extract the necessary information from the payload
        intent = payload['queryResult']['intent']['displayName']
        parameters = payload['queryResult']['parameters']
        output_contexts = payload['queryResult']['outputContexts']

        # Extract session_id from output_contexts
        try:
            session_id = generic_helper.extract_session_id(output_contexts[0]["name"])
        except (IndexError, KeyError):
            return JSONResponse(content={
                "fulfillmentText": "Sorry, I couldn't process your request due to missing session information."
            })

        print(f"Received intent: {intent}")

        intent_handler_dict = {
            'new.order': start_new_order,
            'order.add - context: ongoing-order': add_to_order,
            'order.remove - context: ongoing-order': remove_from_order,
            'order.complete - context: ongoing-order': complete_order,
            'track.order - context: ongoing-tracking': track_order
        }

        # Check if the intent is valid
        if intent not in intent_handler_dict:
            return JSONResponse(content={
                "fulfillmentText": "Sorry, I don't understand that request. Please try again."
            })

        return intent_handler_dict[intent](parameters, session_id, output_contexts, payload['session'])

    except Exception as e:
        print(f"Error processing webhook request: {e}")
        return JSONResponse(content={
            "fulfillmentText": "Sorry, something went wrong on our end. Please try again later."
        }, status_code=500)


def start_new_order(parameters: dict, session_id: str, output_contexts: list, dialogflow_session: str) -> JSONResponse:
    print(f"Session ID received: {session_id}")
    print(f"Current sessions in memory: {list(inprogress_orders.keys())}")

    if session_id in inprogress_orders:
        print(f"Found existing order for session: {session_id}")
        previous_order_id = inprogress_orders[session_id].get('order_id')
        if previous_order_id:
            print(f"Deleting previous order ID: {previous_order_id}")
            db_helper.delete_order(previous_order_id)
        del inprogress_orders[session_id]
    else:
        print("No existing order found for this session.")

    # Generate a new order_id
    new_order_id = db_helper.get_next_order_id()

    # Initialize a new empty order
    inprogress_orders[session_id] = {'order_id': new_order_id}

    # Set the ongoing-order context with the new order_id
    fulfillment_text = f"Ok, starting a new order. You can say things like 'I want two tagines and one Moroccan mint tea'. Make sure to specify a quantity for every food item! Also, we have only the following items on our menu: Tagine, Couscous, Harira, Pastilla, Mechoui, Zaalouk, Moroccan Mint Tea, Khobz, and Chebakia."

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text,
        "outputContexts": [
            {
                "name": f"{dialogflow_session}/contexts/ongoing-order",
                "lifespanCount": 5,
                "parameters": {"order_id": float(new_order_id)}  # Dialogflow expects numbers as floats
            }
        ]
    })

def save_to_db(order: dict) -> int:
    next_order_id = order.get('order_id', db_helper.get_next_order_id())

    # Insert individual items along with quantity in orders table
    for food_item, quantity in order.items():
        if food_item == 'order_id':
            continue  # Skip the order_id key
        rcode = db_helper.insert_order_item(
            food_item,
            quantity,
            next_order_id
        )

        if rcode == -1:
            return -1

    # Insert order tracking status
    db_helper.insert_order_tracking(next_order_id, "in progress")

    return next_order_id

def complete_order(parameters: dict, session_id: str, output_contexts: list, dialogflow_session: str) -> JSONResponse:
    if session_id not in inprogress_orders:
        fulfillment_text = "I'm having trouble finding your order. Sorry! Can you place a new order please?"
    else:
        order = inprogress_orders[session_id]
        order_id = save_to_db(order)
        if order_id == -1:
            fulfillment_text = "Sorry, I couldn't process your order due to a backend error. " \
                               "Please place a new order again"
        else:
            order_total = db_helper.get_total_order_price(order_id)
            fulfillment_text = f"Awesome. We have placed your order. " \
                               f"Here is your order id # {order_id}. " \
                               f"Your order total is {order_total}$ which you can pay at the time of delivery!"
        del inprogress_orders[session_id]

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text,
        "outputContexts": []  # Clear ongoing-order context
    })

def add_to_order(parameters: dict, session_id: str, output_contexts: list, dialogflow_session: str) -> JSONResponse:
    food_items = parameters["food-item"]
    quantities = parameters["number"]

    if len(food_items) != len(quantities):
        fulfillment_text = "Sorry, I didn't understand. Can you please specify food items and quantities clearly?"
    else:
        new_food_dict = dict(zip(food_items, quantities))

        if session_id in inprogress_orders:
            current_food_dict = inprogress_orders[session_id]
            current_food_dict.update(new_food_dict)
            inprogress_orders[session_id] = current_food_dict
        else:
            # If no in-progress order, create one with the order_id from context
            order_id = None
            for context in output_contexts:
                if "ongoing-order" in context["name"]:
                    order_id = int(context["parameters"].get("order_id", 0))
                    break
            if not order_id:
                order_id = db_helper.get_next_order_id()
            inprogress_orders[session_id] = {'order_id': order_id, **new_food_dict}

        order_str = generic_helper.get_str_from_food_dict(inprogress_orders[session_id])
        fulfillment_text = f"So far you have: {order_str}. Do you need anything else?"

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text,
        "outputContexts": [
            {
                "name": f"{dialogflow_session}/contexts/ongoing-order",
                "lifespanCount": 5,
                "parameters": {"order_id": float(inprogress_orders[session_id]['order_id'])}
            }
        ]
    })

def remove_from_order(parameters: dict, session_id: str, output_contexts: list, dialogflow_session: str) -> JSONResponse:
    if session_id not in inprogress_orders:
        return JSONResponse(content={
            "fulfillmentText": "I'm having trouble finding your order. Sorry! Can you place a new order please?"
        })

    food_items = parameters.get("food-item", [])
    current_order = inprogress_orders[session_id]

    removed_items = []
    no_such_items = []

    for item in food_items:
        if item not in current_order or item == 'order_id':
            no_such_items.append(item)
        else:
            removed_items.append(item)
            del current_order[item]

    fulfillment_text = ""
    if len(removed_items) > 0:
        fulfillment_text += f'Removed {",".join(removed_items)} from your order! '

    if len(no_such_items) > 0:
        fulfillment_text += f'Your current order does not have {",".join(no_such_items)}. '

    if len([k for k in current_order.keys() if k != 'order_id']) == 0:
        fulfillment_text += "Your order is empty!"
    else:
        order_str = generic_helper.get_str_from_food_dict(current_order)
        fulfillment_text += f"Here is what is left in your order: {order_str}"

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text.strip(),
        "outputContexts": [
            {
                "name": f"{dialogflow_session}/contexts/ongoing-order",
                "lifespanCount": 5,
                "parameters": {"order_id": float(current_order['order_id'])}
            }
        ]
    })

def track_order(parameters: dict, session_id: str, output_contexts: list, dialogflow_session: str) -> JSONResponse:
    try:
        # Handle 'number' for order ID
        order_id = int(parameters['number'])
        if order_id == 0:
            fulfillment_text = "Please provide a valid order ID."
        else:
            order_status = db_helper.get_order_status(order_id)
            if order_status:
                fulfillment_text = f"The order status for order id: {order_id} is: {order_status}"
            else:
                fulfillment_text = f"No order found with order id: {order_id}"
    except (ValueError, TypeError):
        fulfillment_text = "Please provide a valid order ID."

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)