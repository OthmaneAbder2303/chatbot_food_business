-- Create database
CREATE DATABASE chat_food
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8';

\connect chat_food

-- Schema creation
SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Table structure for table `food_items`
--

DROP TABLE IF EXISTS food_items CASCADE;
CREATE TABLE food_items (
    item_id INTEGER NOT NULL,
    name VARCHAR(255),
    price NUMERIC(10,2),
    PRIMARY KEY (item_id)
);

--
-- Dumping data for table `food_items`
--

INSERT INTO food_items (item_id, name, price) VALUES 
(1, 'Tagine', 10.00),
(2, 'Couscous', 8.00),
(3, 'Harira', 5.00),
(4, 'Pastilla', 9.00),
(5, 'Mechoui', 12.00),
(6, 'Zaalouk', 6.00),
(7, 'Moroccan Mint Tea', 4.00),
(8, 'Khobz', 3.00),
(9, 'Chebakia', 5.00);

--
-- Table structure for table `order_tracking`
--

DROP TABLE IF EXISTS order_tracking CASCADE;
CREATE TABLE order_tracking (
    order_id INTEGER NOT NULL,
    status VARCHAR(255),
    PRIMARY KEY (order_id)
);

--
-- Dumping data for table `order_tracking`
--

INSERT INTO order_tracking (order_id, status) VALUES 
(40, 'delivered'),
(41, 'in transit');

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
    order_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER,
    total_price NUMERIC(10,2),
    PRIMARY KEY (order_id, item_id),
    CONSTRAINT orders_item_id_fkey FOREIGN KEY (item_id) 
        REFERENCES food_items (item_id) ON DELETE RESTRICT
);

--
-- Dumping data for table `orders`
--

INSERT INTO orders (order_id, item_id, quantity, total_price) VALUES 
(40, 1, 2, 20.00), -- 2 Tagine @ $10.00 each
(40, 4, 1, 9.00),  -- 1 Pastilla @ $9.00
(41, 7, 3, 12.00), -- 3 Moroccan Mint Tea @ $4.00 each
(41, 2, 2, 16.00), -- 2 Couscous @ $8.00 each
(41, 3, 4, 20.00); -- 4 Harira @ $5.00 each

--
-- Function: get_price_for_item
--

CREATE OR REPLACE FUNCTION get_price_for_item(p_item_name VARCHAR) 
RETURNS NUMERIC(10,2) AS $$
DECLARE
    v_price NUMERIC(10,2);
BEGIN
    -- Check if the item_name exists in the food_items table
    IF EXISTS (SELECT 1 FROM food_items WHERE name = p_item_name) THEN
        -- Retrieve the price for the item
        SELECT price INTO v_price
        FROM food_items
        WHERE name = p_item_name;
        
        RETURN v_price;
    ELSE
        -- Invalid item_name, return -1
        RETURN -1;
    END IF;
END;
$$ LANGUAGE plpgsql;

--
-- Function: get_total_order_price
--

CREATE OR REPLACE FUNCTION get_total_order_price(p_order_id INTEGER) 
RETURNS NUMERIC(10,2) AS $$
DECLARE
    v_total_price NUMERIC(10,2);
BEGIN
    -- Check if the order_id exists in the orders table
    IF EXISTS (SELECT 1 FROM orders WHERE order_id = p_order_id) THEN
        -- Calculate the total price
        SELECT SUM(total_price) INTO v_total_price
        FROM orders
        WHERE order_id = p_order_id;
        
        RETURN v_total_price;
    ELSE
        -- Invalid order_id, return -1
        RETURN -1;
    END IF;
END;
$$ LANGUAGE plpgsql;

--
-- Procedure: insert_order_item
--

CREATE OR REPLACE PROCEDURE insert_order_item(
    p_food_item VARCHAR,
    p_quantity INTEGER,
    p_order_id INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_item_id INTEGER;
    v_price NUMERIC(10,2);
    v_total_price NUMERIC(10,2);
BEGIN
    -- Validate quantity
    IF p_quantity <= 0 THEN
        RAISE EXCEPTION 'Quantity must be greater than zero';
    END IF;

    -- Get the item_id and price for the food item
    SELECT item_id INTO v_item_id 
    FROM food_items 
    WHERE name = p_food_item;

    -- Check if item exists
    IF v_item_id IS NULL THEN
        RAISE EXCEPTION 'Food item % not found', p_food_item;
    END IF;

    v_price := get_price_for_item(p_food_item);

    -- Check if price is valid
    IF v_price = -1 THEN
        RAISE EXCEPTION 'Invalid price for food item %', p_food_item;
    END IF;

    -- Calculate the total price for the order item
    v_total_price := v_price * p_quantity;

    -- Insert the order item into the orders table
    INSERT INTO orders (order_id, item_id, quantity, total_price)
    VALUES (p_order_id, v_item_id, p_quantity, v_total_price);
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inserting order item: %', SQLERRM;
END;
$$;

--
-- Dump completed
COMMENT ON DATABASE chat_food IS 'Database for Moroccan Food Business, adapted for PostgreSQL on 2025-04-27';