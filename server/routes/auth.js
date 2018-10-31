import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendResponse from '../helpers/responses';
import constants from '../helpers/constants';

import {
  validateUser, ensureToken,
} from '../helpers/validators';
import { createUser, getUser } from '../crud/db-query';

dotenv.config();
const authRouter = express.Router();

let saltRound = process.env.SALT_ROUND;
let secretKey = process.env.TOKEN_KEY;
let defaultPassword = process.env.DEFAULT_PASSWORD;

if (process.env.current_env === 'test') {
  secretKey = 'my_secret_key';
  saltRound = 6;
  defaultPassword = 'attendantpassword';
}
authRouter.post('/signup', validateUser, ensureToken, (req, res) => {
  if (req.body.decoded.level !== constants.adminLevel) {
    // User not an admin. Has no access to route.
    sendResponse(res, 403, null, 'Your are not allowed to modify this content');
    return;
  }
  getUser(req.body.email)
    .then((result) => {
      if (result.length > 0) {
        sendResponse(res, 409, null, 'email in use');
      } else {
        bcrypt.hash(defaultPassword, parseInt(saltRound, 10))
          .then((hash) => {
            // start storage process
            createUser({
              email: req.body.email,
              password: hash,
              name: req.body.name,
              level: constants.attendantLevel,
            })
              .then((value) => {
                if (value === 1) {
                  sendResponse(res, 201,  `account created for '${req.body.name}'`);
                } else {
                  sendResponse(res, 500, null, 'Internal server error');
                }
              }).catch(() => {
                // console.log(e);
                sendResponse(res, 500, null, 'Internal server error');
              });
          }).catch(() => {
            // console.log(e);
            sendResponse(res, 500, null, 'Internal server error');
          });
      }
    })
    .catch(() => {
      // console.log(e);
      sendResponse(res, 500, null, 'Internal server error');
    });
});

authRouter.post('/login', (req, res) => {
  // confirm email exists in database
  getUser(req.body.email)
    .then((result) => {
      if (!req.body.password) {
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
        sendResponse(res, 403, null, 'Invalid username or password');
      }
    })
    .catch((e) => {
      console.log(e);
      sendResponse(res, 403, null, 'Invalid username or password');
    });
});


export default authRouter;
