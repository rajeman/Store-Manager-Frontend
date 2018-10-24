import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {isPositiveInteger} from '../helpers/validators'


const authRouter = express.Router();

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
    res.status(400).send({ error: 'Invalid input. Make sure email is valid, name and password' + 
      ' are at least 3 and 6 characters respectively and \'level\' should be 1 for attendant and 2 for admin' });
  }
};


authRouter.post('/signup', validateUser, (req, res, next) => {
   res.send({ message: 'valid user' });

});


export default authRouter;
