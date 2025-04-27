import psycopg2
from psycopg2.extras import RealDictCursor

# Global database connection
cnx = psycopg2.connect(
    host="localhost",
    user="postgres",
    password="Iyas.2020",
    database="chat_food",
    port="5432",
    cursor_factory=RealDictCursor
)

# Function to insert an order item into the orders table
def insert_order_item(order_id: int, food_item: str, quantity: int) -> int:
    try:
        cursor = cnx.cursor()

        # Inserting the order item
        insert_query = "INSERT INTO orders (order_id, food_item, quantity) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (order_id, food_item.lower(), quantity))

        # Committing the changes
        cnx.commit()

        # Closing the cursor
        cursor.close()

        print("Order item inserted successfully!")
        return 0

    except psycopg2.Error as err:
        print(f"Error inserting order item: {err}")
        cnx.rollback()
        return -1

    except Exception as e:
        print(f"An error occurred: {e}")
        cnx.rollback()
        return -1


# Function to insert a record into the order_tracking table
def insert_order_tracking(order_id: int, status: str) -> None:
    try:
        cursor = cnx.cursor()

        # Inserting or updating the record in the order_tracking table
        insert_query = """
            INSERT INTO order_tracking (order_id, status)
            VALUES (%s, %s)
            ON CONFLICT (order_id)
            DO UPDATE SET status = EXCLUDED.status
        """
        cursor.execute(insert_query, (order_id, status))

        # Committing the changes
        cnx.commit()

        # Closing the cursor
        cursor.close()

    except psycopg2.Error as err:
        print(f"Error inserting order tracking: {err}")
        cnx.rollback()

    except Exception as e:
        print(f"An error occurred: {e}")
        cnx.rollback()


# Function to calculate the total order price
def get_total_order_price(order_id: int) -> float:
    try:
        cursor = cnx.cursor()

        # Query to calculate total price by joining orders and prices tables
        query = """
            SELECT SUM(o.quantity * p.price) as total_price
            FROM orders o
            JOIN prices p ON o.food_item = p.food_item
            WHERE o.order_id = %s
        """
        cursor.execute(query, (order_id,))

        # Fetching the result
        result = cursor.fetchone()
        total_price = result["total_price"] if result["total_price"] is not None else 0.0

        # Closing the cursor
        cursor.close()

        return round(total_price, 2)

    except psycopg2.Error as err:
        print(f"Error calculating total price: {err}")
        return 0.0

    except Exception as e:
        print(f"An error occurred: {e}")
        return 0.0


# Function to get the next available order_id
def get_next_order_id() -> int:
    try:
        cursor = cnx.cursor()

        # Query to get the maximum order_id
        query = "SELECT MAX(order_id) as max_id FROM orders"
        cursor.execute(query)

        # Fetching the result
        result = cursor.fetchone()
        max_id = result["max_id"]

        # Closing the cursor
        cursor.close()

        # Returning the next available order_id
        return 1 if max_id is None else max_id + 1

    except psycopg2.Error as err:
        print(f"Error getting next order ID: {err}")
        return 1

    except Exception as e:
        print(f"An error occurred: {e}")
        return 1


# Function to fetch the order status from the order_tracking table
def get_order_status(order_id: int) -> str:
    try:
        cursor = cnx.cursor()

        # Query to fetch the order status
        query = "SELECT status FROM order_tracking WHERE order_id = %s"
        cursor.execute(query, (order_id,))

        # Fetching the result
        result = cursor.fetchone()

        # Closing the cursor
        cursor.close()

        # Returning the order status
        return result["status"] if result else None

    except psycopg2.Error as err:
        print(f"Error getting order status: {err}")
        return None

    except Exception as e:
        print(f"An error occurred: {e}")
        return None


if __name__ == "__main__":
    # Example usage for testing
    # print(get_total_order_price(1))
    # insert_order_item("Pizza", 2, 100)
    # insert_order_tracking(100, "in progress")
    print(get_next_order_id())
    print(get_order_status(41))