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

# Function to call the PostgreSQL stored procedure and insert an order item
def insert_order_item(food_item: str, quantity: int, order_id: int) -> int:
    try:
        cursor = cnx.cursor()
        # Ensure quantity is an integer
        quantity = int(quantity)
        # Call the stored procedure with correct parameter order and explicit type casts
        cursor.execute(
            "CALL insert_order_item(%s::varchar, %s::integer, %s::integer)",
            (food_item, quantity, order_id)
        )
        cnx.commit()
        cursor.close()
        print("Order item inserted successfully!")
        return 1
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
        # Insert or update the record in the order_tracking table
        insert_query = """
            INSERT INTO order_tracking (order_id, status)
            VALUES (%s, %s)
            ON CONFLICT (order_id)
            DO UPDATE SET status = EXCLUDED.status
        """
        cursor.execute(insert_query, (order_id, status))
        cnx.commit()
        cursor.close()
    except psycopg2.Error as err:
        print(f"Error inserting order tracking: {err}")
        cnx.rollback()
    except Exception as e:
        print(f"An error occurred: {e}")
        cnx.rollback()

# Function to get the total order price using the schema's function
def get_total_order_price(order_id: int) -> float:
    try:
        cursor = cnx.cursor()
        # Call the schema's get_total_order_price function
        query = "SELECT get_total_order_price(%s) AS total_price"
        cursor.execute(query, (order_id,))
        result = cursor.fetchone()
        total_price = result["total_price"] if result["total_price"] is not None else -1.0
        cursor.close()
        return round(float(total_price), 2) if total_price >= 0 else -1.0
    except psycopg2.Error as err:
        print(f"Error calculating total price: {err}")
        return -1.0
    except Exception as e:
        print(f"An error occurred: {e}")
        return -1.0

# Function to get the next available order_id
def get_next_order_id() -> int:
    try:
        cursor = cnx.cursor()
        query = "SELECT MAX(order_id) AS max_id FROM orders"
        cursor.execute(query)
        result = cursor.fetchone()
        max_id = result["max_id"]
        cursor.close()
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
        query = "SELECT status FROM order_tracking WHERE order_id = %s"
        cursor.execute(query, (order_id,))
        result = cursor.fetchone()
        cursor.close()
        return result["status"] if result else None
    except psycopg2.Error as err:
        print(f"Error getting order status: {err}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Function to call the PostgreSQL stored procedure to delete an order
def delete_order(order_id: int) -> int:
    try:
        cursor = cnx.cursor()
        # Delete all items from orders table for the given order_id
        cursor.execute("DELETE FROM orders WHERE order_id = %s", (order_id,))

        # Delete from order_tracking if no items remain for the order_id
        cursor.execute("""
                       DELETE
                       FROM order_tracking
                       WHERE order_id = %s
                         AND NOT EXISTS (SELECT 1 FROM orders WHERE order_id = %s)
                       """, (order_id, order_id))
        print("I'm here")

        # Check if any rows were affected (optional, for logging)
        rows_affected = cursor.rowcount
        cnx.commit()
        cursor.close()

        if rows_affected == 0:
            print(f"No order found for order_id {order_id}")
        else:
            print(f"Order {order_id} deleted successfully!")
        return 1

    except psycopg2.Error as err:
        print(f"Error deleting order: {err}")
        cnx.rollback()
        return -1
    except Exception as e:
        print(f"An error occurred: {e}")
        cnx.rollback()
        return -1

if __name__ == "__main__":
    # just for testing
    print(get_next_order_id())
    print(get_order_status(41))
    print(delete_order(46))