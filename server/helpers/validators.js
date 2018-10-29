import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let secretKey = process.env.TOKEN_KEY;

if (process.env.current_env === 'test') {
  secretKey = 'my_secret_key';
}

const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);

const verifyCartItem = (req, res, next) => {
  const { productId, productQuantity } = req.body;
  if (productId && isPositiveInteger(productId) && productQuantity
    && isPositiveInteger(productQuantity)) {
    req.body.cartItem = { productId, productQuantity };
    next();
  } else {
    res.status(422).send({
      error: 'Invalid product. Product id and product quantity must be numbers greater than zero ',
      status: 422,
    });
  }
};

const sendServerError = (res) => {
  res.status(500).send({
    error: 'Internal server error',
    status: 500,
  });
};

const sendAuthenticationError = (res) => {
  res.status(403).send({
    error: 'Invalid username or password',
    status: 403,
  });
};

const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  const validName = typeof name === 'string' && name.trim() !== '' && name.trim().length >= 3;
  const validEmail = typeof email === 'string' && validator.isEmail(email);
  if (validEmail && validName) {
    next();
  } else {
    res.status(400).send({
      error: 'Invalid input. Make sure email is valid and name'
      + ' must be at least 3 characters ',
    });
  }
};

const ensureToken = (req, res, next) => {
  let bearerToken = '';
  const bearerHeader = req.get('Authorization');
  if (bearerHeader) {
    bearerToken = bearerHeader.split(' ')[1];
  } else {
    bearerToken = req.body.token;
  }
  if (!bearerToken) {
    bearerToken = '';
  }
  try {
    const decoded = jwt.verify(bearerToken, secretKey);
    req.body.decoded = decoded;
    next();
  } catch (err) {
    res.status(403).send({
      error: 'Invalid Token',
      status: 403,
    });
  }
};


const verifyProductInput = (req, res, next) => {
  const product = req.body;
  if (product && product.productName && product.productName.length >= 3 && product.price
    && isPositiveInteger(product.price)
       && product.minimumInventory && isPositiveInteger(product.minimumInventory)
       && product.productQuantity && isPositiveInteger(product.productQuantity)) {
    next();
  } else {
    res.status(422).send({
      error: 'Invalid product input. Product name must be at least 3 characters with product price'
      + ', product quantity and minimum inventory positive integers ',
      status: 422,
    });
  }
};
export {
  sendServerError, sendAuthenticationError, validateUser, ensureToken,
  verifyProductInput, verifyCartItem,
};
