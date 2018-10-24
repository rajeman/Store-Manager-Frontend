import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import dotenv from 'dotenv';
import { isPositiveInteger } from '../helpers/validators';
import { createUser } from '../crud/db-query.js';

dotenv.config();
const authRouter = express.Router();
const saltRound = process.env.SALT_ROUND;
console.log(saltRound);

const sendServerError = (res) =>{
  res.send({
    error: 'Internal server error',
    status: 500,
  });
};

const validateUser = (req, res, next) => {
  const {
    email, password, rePassword, name, level,
  } = req.body;
  const validName = typeof name === 'string' && name.trim() !== '' && name.trim().length >= 3;
  const validEmail = typeof email === 'string' && validator.isEmail(email);
  const validUserType = typeof level !== 'undefined' && isPositiveInteger(level);
  const validPassword = typeof password === 'string' && password.trim() !== ''
        && password.trim().length >= 6 && password === rePassword;

  if (validEmail && validPassword && validName && validUserType) {
    next();
  } else {
    res.status(400).send({
      error: 'Invalid input. Make sure email is valid, name and password'
      + ' are at least 3 and 6 characters respectively and \'level\' should be 1 for attendant and 2 for admin',
    });
  }
};


authRouter.post('/signup', validateUser, (req, res, next) => {
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
            res.send({
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

});


export default authRouter;
