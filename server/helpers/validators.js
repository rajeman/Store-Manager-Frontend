import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendResponse from './responses';

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
    sendResponse(res, 422, null, 'Invalid product. Product id and product quantity must be numbers greater than zero ');
  }
};


const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  const validName = typeof name === 'string' && name.trim() !== '' && name.trim().length >= 3;
  const validEmail = typeof email === 'string' && validator.isEmail(email);
  if (validEmail && validName) {
    next();
  } else {
    sendResponse(res, 400, null, 'Invalid input. Make sure email is valid and name');
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
    sendResponse(res, 403, null, 'Invalid Token');
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
    sendResponse(res, 422, null, 'Invalid product input. Product name must be at least 3 characters with product price'
      + ', product quantity and minimum inventory positive integers ');
  }
};
export {
  validateUser, ensureToken,
  verifyProductInput, verifyCartItem,
};
