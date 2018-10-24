import express from 'express';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
import { sendServerError, validateUser } from '../helpers/validators';
import { createUser, getUser } from '../crud/db-query';

dotenv.config();
const authRouter = express.Router();
let saltRound = process.env.SALT_ROUND;
if (!saltRound) {
  saltRound = 15;
}
authRouter.post('/signup', validateUser, (req, res) => {
  getUser(req.body.email)
    .then((result) => {
      if (result.length > 0) {
        res.status(409).send({
          error: 'email in use',
          status: 409,
        });
      } else {
        bcrypt.hash(req.body.password, parseInt(saltRound, 10))
          .then((hash) => {
            // start storage process
            createUser({
              email: req.body.email,
              password: hash,
              name: req.body.name,
              level: req.body.level,
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


export default authRouter;
