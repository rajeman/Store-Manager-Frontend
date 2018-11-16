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
`WITH quantity_decrement AS
               ( UPDATE ${productsTable} SET product_quantity = product_quantity - $1
                 WHERE product_id = $2 
                  RETURNING  product_name, product_price, product_id 
               )
INSERT INTO ${cartTable}() values(
`
const addToCart = item => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `WITH quantity_decrement AS
               ( UPDATE ${productsTable} SET product_quantity = product_quantity - $1
                 WHERE product_id = $2 
                  RETURNING  product_name, product_price, product_id 
               )
                 INSERT INTO ${cartTable} (user_id, time_added, total_price,  product_quantity,  
                 product_name, product_price, product_id ) 

                VALUES( $3, $4, $5, $1,  (SELECT product_name FROM quantity_decrement), 
                   (SELECT product_price FROM quantity_decrement),
                   (SELECT product_id FROM quantity_decrement))`;


      const params = [item.productQuantity, item.productId, item.userId,
        item.timeAdded, item.totalPrice];
      client.query(sql, params)
        .then((result) => {
          // console.log(result.rows);
          resolve(result.rows);
          client.end();
        }).catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

const createOrder = items => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {


      const sql = ``;

      const params = [item.timeCheckedOut, item.userId];
      client.query(sql, params)
        .then((result) => {
          resolve(result.rowCount);
          client.end();
        }).catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

/*const createOrder = item => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `WITH checked_out_items AS
                    ( UPDATE ${cartTable} SET time_checked_out = $1
                        WHERE (user_id = $2 AND time_checked_out = 0)
                      RETURNING  product_quantity, total_price
                     )
                   INSERT INTO ${ordersTable} (user_id, time_checked_out, order_price, order_quantity)
                   VALUES($2, $1, (SELECT SUM(total_price) FROM checked_out_items), 
                                   (SELECT SUM(product_quantity) FROM checked_out_items) )
                  `;

      const params = [item.timeCheckedOut, item.userId];
      client.query(sql, params)
        .then((result) => {
          resolve(result.rowCount);
          client.end();
        }).catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});*/

const getOrders = id => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      if (id) {
        const params = [id];
        const sql = `WITH order_summary AS
                    ( SELECT orders.*, users.user_name FROM users LEFT JOIN orders ON orders.user_id = users.user_id WHERE order_id = $1
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

const getCart = id => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `SELECT * FROM ${cartTable} WHERE user_id = $1 AND time_checked_out = 0;`;

      const params = [id];
      client.query(sql, params)
        .then((result) => {
          resolve(result.rows);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});

const clearTable = tableName => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      let sql = `DELETE FROM ${tableName};`;
      if (tableName === usersTable) {
        sql = `DELETE FROM ${tableName} WHERE user_level != 2;`;
      }
      client.query(sql)
        .then((result) => {
          resolve(result.rowCount);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});


export {
  createUser, getUser, clearTable, createProduct, getProducts, deleteProducts, updateProducts,
  addToCart, createOrder, getOrders, getCart,
};


// CREATE TABLE users(user_id serial PRIMARY KEY, user_name text NOT NULL,
// user_email text UNIQUE NOT NULL, user_password text NOT NULL);

// const client = new Client({ connectionString, ssl: true });
