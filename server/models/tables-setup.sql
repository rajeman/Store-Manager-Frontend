CREATE DATABASE store_manager;
\connect store_manager
CREATE TABLE IF NOT EXISTS users
 (
 	user_id serial PRIMARY KEY, 
    user_name text NOT NULL, 
    user_email text UNIQUE NOT NULL, 
    user_password text NOT NULL,
    total_orders integer default(0),
    user_level integer NOT NULL
 );

 CREATE TABLE IF NOT EXISTS orders
 (
 	order_id serial PRIMARY KEY, 
 	user_id integer NOT NULL,
 	time_checked_out bigint default (0),
    product_name text NOT NULL, 
    product_price integer NOT NULL,
    product_quantity integer NOT NULL,
    order_price integer NOT NULL
   
 );

CREATE TABLE IF NOT EXISTS products
 (
 	product_id serial PRIMARY KEY,
 	product_name text NOT NULL,
 	minimum_inventory integer default(0),
 	product_price integer NOT NULL
 );

