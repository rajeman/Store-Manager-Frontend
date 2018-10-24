import { Client } from 'pg';

let connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/store_manager';

if (process.env.current_env === 'test') {
  connectionString = 'postgres://localhost:5432/store_manager_test';
}
const usersTable = 'users';
const ordersTable = 'orders';
const productsTable = 'products';


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


export { createUser };


// CREATE TABLE users(user_id serial PRIMARY KEY, user_name text NOT NULL,
// user_email text UNIQUE NOT NULL, user_password text NOT NULL);

// const client = new Client({ connectionString, ssl: true });
