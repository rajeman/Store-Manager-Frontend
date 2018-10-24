import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';


const authRouter = express.Router();

const validateUser = (req, res, next) => {
  const { email, password, name, isAdmin } = req.body;
  const validName = typeof name === 'string' && name.trim() !== '' && name.trim().length >= 3;
  const validEmail = typeof email === 'string' && validator.isEmail(email);
  const validPassword = typeof password === 'string' && password.trim() !== ''
        && password.trim().length >= 6;

  if (validEmail && validPassword && validName) {
    next();
  } else {
    res.status(400).send({ error: 'Invalid input. Make sure email is valid, name and password are at least 3 and 6 characters respectively' });
  }
};


authRouter.post('/signup', validateUser, (req, res, next) => {
  // res.send({ message: 'valid user' });
  
});




export default authRouter;
