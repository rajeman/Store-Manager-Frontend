import { Client } from 'pg';

let connectionString = process.env.DATABASE_URL;

if (process.env.current_env === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
}
const usersTable = 'users';
const ordersTable = 'orders';
const productsTable = 'products';
const cartTable = 'cart';


const createUser = item => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `INSERT INTO ${usersTable} (user_email, user_password, user_name, user_level) VALUES ($1, $2, $3, $4)`;
      const params = [item.email, item.password, item.name, item.level];
      client.query(sql, params)
        .then((result) => {
          // console.log(result.rows);
          resolve(result.rowCount);
          client.end();
        })
        .catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

const getUser = userInput => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `SELECT * FROM ${usersTable} WHERE user_email = $1;`;
      /* if (!userInput.includes('@')) {
        sql = `SELECT * FROM ${usersTable} WHERE user_id = $1;`;
      } */
      const params = [userInput];
      client.query(sql, params)
        .then((result) => {
          resolve(result.rows);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});

const createProduct = item => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `INSERT INTO ${productsTable} (product_name, minimum_inventory, product_price, product_quantity) VALUES ($1, $2, $3, $4)`;
      const params = [item.productName, item.minimumInventory, item.price, item.productQuantity];
      client.query(sql, params)
        .then((result) => {
          // console.log(result.rows);
          resolve(result.rowCount);
          client.end();
        })
        .catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

const getProducts = id => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      if (id) {
        const params = [id];
        const sql = `SELECT * FROM ${productsTable} WHERE product_id = $1`;
        client.query(sql, params)
          .then((result) => {
            resolve(result.rows);
            client.end();
          })
          .catch(e => reject(e));
      } else {
        const sql = `SELECT * FROM ${productsTable}`;
        client.query(sql)
          .then((result) => {
            resolve(result.rows);
            client.end();
          })
          .catch(e => reject(e));
      }
    }).catch(e => reject(e));
});

const updateProducts = item => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `UPDATE ${productsTable} SET product_name = $1, product_price = $2, minimum_inventory = $3, product_quantity = $4 WHERE product_id = $5`;
      const params = [item.productName, item.price, item.minimumInventory,
        item.productQuantity, item.id];
      client.query(sql, params)
        .then((result) => {
          // console.log(result.rows);
          resolve(result.rowCount);
          client.end();
        })
        .catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

const deleteProducts = id => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      if (id) {
        const params = [id];
        const sql = `DELETE FROM ${productsTable} WHERE product_id = $1`;
        client.query(sql, params)
          .then((result) => {
            resolve(result.rowCount);
            client.end();
          })
          .catch(e => reject(e));
      }
    }).catch(e => reject(e));
});


const createOrder = (userId, items) => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const jsonItems = JSON.stringify(items);
      const timeCheckedOut = (new Date()).getTime();
      const sql = `
           DROP TABLE IF EXISTS temp_table;
           CREATE TEMPORARY TABLE temp_table 
             ( 
                          "productId"       INTEGER, 
                          "productQuantity" INTEGER, 
                          "productName" TEXT, 
                          "productPrice" INTEGER, 
                          "totalPrice" INTEGER 
             );

             WITH inserted_values AS 
( 
            insert INTO temp_table 
                        ( 
                                    "productId", 
                                    "productQuantity", 
                                    "productName", 
                                    "productPrice",
                                    "totalPrice" 
                        ) 
            SELECT    * 
            FROM      json_to_recordset('${jsonItems}') AS x("productId" INTEGER, "productQuantity" INTEGER, "productName" text, "productPrice" INTEGER, "totalPrice" INTEGER)
            returning * 
) 
, quantity_decrement AS 
( 
          UPDATE ${productsTable} 
          SET       product_quantity = product_quantity - inserted_values."productQuantity" 
          FROM      inserted_values 
          WHERE     ${productsTable}.product_id = inserted_values."productId" 
          returning * 
) 
, order_details_insert AS 
( 
            INSERT INTO ${cartTable} 
                        (           product_name, 
                                    product_price, 
                                    product_quantity, 
                                    product_id, 
                                    total_price,
                                    user_id, 
                                    time_checked_out
                        ) 
            SELECT "productName", "productPrice", "productQuantity", "productId", "totalPrice", u_id, t_c_out
            FROM  
            inserted_values, (select ${userId} as u_id) as ud, (select ${timeCheckedOut} as t_c_out) as tc
            returning *     

)
, order_summary_insert AS
 (
           INSERT INTO ${ordersTable}
                        (   user_id,
                            time_checked_out, 
                            order_price, 
                            order_quantity
                        )
             VALUES
             (${userId},  ${timeCheckedOut}, (SELECT SUM(total_price) FROM order_details_insert), (SELECT SUM(product_quantity)
                         FROM order_details_insert) )
            RETURNING  user_id, time_checked_out, order_price, order_quantity     
 ) 

SELECT * FROM   order_summary_insert;
      `;

      client.query(sql)
        .then((result) => {
          resolve(result);
          client.end();
        }).catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

const getOrders = id => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      if (id) {
        const params = [id];
        const sql = `WITH order_summary AS
                    ( SELECT orders.*, users.user_name FROM users LEFT JOIN orders ON orders.user_id = users.user_id WHERE time_checked_out = $1
                     )
                    SELECT * FROM (SELECT * FROM ${cartTable} WHERE time_checked_out = (SELECT time_checked_out FROM order_summary)) a, (SELECT * FROM order_summary) b
                  `;

        client.query(sql, params)
          .then((result) => {
            resolve(result.rows);
            client.end();
          })
          .catch(e => reject(e));
      } else {
        // const sql = `SELECT * FROM ${ordersTable},
        // users.user_name WHERE orders.user_id = users.user_id`;
        const sql = 'SELECT orders.*, users.user_name FROM users LEFT JOIN orders ON orders.user_id = users.user_id WHERE orders.user_id = users.user_id';
        client.query(sql)
          .then((result) => {
            resolve(result.rows);
            client.end();
          })
          .catch(e => reject(e));
      }
    }).catch(e => reject(e));
});


export {
  createUser, getUser, createProduct, getProducts, deleteProducts, updateProducts,
  createOrder, getOrders,
};


// CREATE TABLE users(user_id serial PRIMARY KEY, user_name text NOT NULL,
// user_email text UNIQUE NOT NULL, user_password text NOT NULL);

// const client = new Client({ connectionString, ssl: true });
