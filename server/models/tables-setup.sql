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
 	user_id integer NOT NULL references users(user_id),
 	time_checked_out bigint default (0),
    order_price integer NOT NULL,
    order_quantity integer NOT NULL
 );

  CREATE TABLE IF NOT EXISTS cart
 (
    time_added bigint PRIMARY KEY, 
    user_id integer NOT NULL references users(user_id),
    time_checked_out bigint default (0),
    product_name text NOT NULL, 
    product_price integer NOT NULL,
    product_quantity integer NOT NULL,
    product_id integer NOT NULL references products(product_id) ,
    total_price integer NOT NULL
   
 );

CREATE TABLE IF NOT EXISTS products
 (
 	product_id serial PRIMARY KEY,
 	product_name text NOT NULL,
 	minimum_inventory integer default(0),
 	product_price integer NOT NULL,
    product_quantity integer NOT NULL
 );

INSERT INTO users 
(user_name, user_email, user_password, total_orders, user_level)
VALUES
(
	'Jefferson Piper', 'jpiper@admin.com', '$2b$07$XkCk5ZAJV.7lVTZWDNN/3eX/u/qANOHikMtI67bEoOb8V9QIBEt1i', 0, 2
)

