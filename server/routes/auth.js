import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  sendServerError, validateUser, sendAuthenticationError, ensureToken,
} from '../helpers/validators';
import { createUser, getUser } from '../crud/db-query';

dotenv.config();
const authRouter = express.Router();

let saltRound = process.env.SALT_ROUND;
let secretKey = process.env.TOKEN_KEY;
let defaultPassword = process.env.DEFAULT_PASSWORD;
const attendantLevel = 1;

if (process.env.current_env === 'test') {
  secretKey = 'my_secret_key';
  saltRound = 6;
  defaultPassword = 'password';
}
authRouter.post('/signup', validateUser, ensureToken, (req, res) => {
  if (req.body.decoded.level !== 2) {
    // User not an admin. Has no access to route.
    res.status(403).send({
      error: 'You are not allowed to modify this content',
      status: 403,
    });
    return;
  }
  getUser(req.body.email)
    .then((result) => {
      if (result.length > 0) {
        res.status(409).send({
          error: 'email in use',
          status: 409,
        });
      } else {
        bcrypt.hash(defaultPassword, parseInt(saltRound, 10))
          .then((hash) => {
            // start storage process
            createUser({
              email: req.body.email,
              password: hash,
              name: req.body.name,
              level: attendantLevel,
            })
              .then((value) => {
                if (value === 1) {
                  res.status(201).send({
                    status: '201',
                    message: 'account created',
                  });
                } else {
                  sendServerError(res);
                }
              }).catch((e) => {
                console.log(e);
                sendServerError(res);
              });
          }).catch((e) => {
            console.log(e);
            sendServerError(res);
          });
      }
    })
    .catch((e) => {
      // hash the user's password for storage
      console.log(e);
      sendServerError(res);
    });
});

authRouter.post('/login',  (req, res) => {
  // confirm email exists in database
  getUser(req.body.email)
    .then((result) => {
      if(!req.body.password){
        req.body.password = '';
      }
      if (bcrypt.compareSync(req.body.password, result[0].user_password)) {
        const payload = {};
        payload.status = 303;
        payload.username = result[0].user_name;
        payload.email = result[0].user_email;
        payload.userId = result[0].user_id;
        payload.level = result[0].user_level;
        const token = jwt.sign(payload, secretKey);
        payload.token = token;
        payload.message = 'successfully logged in';
        res.header('Authorization', `Bearer ${token}`);
        res.status(303).send(payload);
      } else {
        sendAuthenticationError(res);
      }
    })
    .catch((e) => {
      console.log(e);
      sendAuthenticationError(res);
    });
});


export default authRouter;
