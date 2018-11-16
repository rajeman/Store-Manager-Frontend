import validator from 'validator';
import jwt from 'jsonwebtoken';
import sendResponse from './responses';
import constants from './constants';
import { getUser, getProducts } from '../crud/db-query';


let secretKey = process.env.TOKEN_KEY;

if (process.env.current_env === 'test') {
  secretKey = process.env.TEST_TOKEN_KEY;
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

const verifyOrderInput = (req, res, next) => {
  const orderInput = req.body;
  // const orderItem = { productsArray: [] };
  /* if(!orderInput || orderInput.length===0){
       sendResponse(res, 400, null, 'Invalid input! Products list missing or empty');
   } */
  let shouldExit = false;
  const { products } = orderInput;
  if (!(products instanceof Array && products.length > 0)) {
    sendResponse(res, 400, null, 'Invalid input! Products list missing or empty');
    return;
  }
  getProducts().then((result) => {
    const databaseProducts = result;
    const mapDatabaseProducts = new Map();
    // add the database products to a map to enable easy lookup
    databaseProducts.forEach((productItem) => {
      mapDatabaseProducts.set(String(productItem.product_id), productItem);
    });
    const duplicateProductsId = new Map();
    products.every((inputProduct) => {
      if (duplicateProductsId.get(String(inputProduct.productId))) {
        sendResponse(res, 400, null, `product with id ${inputProduct.productId} is ordered twice`);
        shouldExit = true;
        return false;
      }
      duplicateProductsId.set(String(inputProduct.productId), inputProduct.productQuantity);
      const currentdbProduct = mapDatabaseProducts.get(String(inputProduct.productId));
      if (!currentdbProduct) {
        sendResponse(res, 404, null, `product with id ${inputProduct.productId} does not exist`);
        shouldExit = true;
        return false;
      }

      if (currentdbProduct.product_quantity < inputProduct.productQuantity) {
        sendResponse(res, 400, null, `requested quantity of '${currentdbProduct.product_name}' (${inputProduct.productQuantity}) with id ${inputProduct.productId} is greater than available quantity (${currentdbProduct.product_quantity})`);
        shouldExit = true;
        return false;
      }
      return true;
    });

    if (shouldExit) {
      return;
    }

    next();
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
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
    // confirm email exists in database
    getUser(req.body.decoded.email)
      .then((result) => {
        req.body.databaseResult = result;
        next();
      })
      .catch(() => {
        // console.log(e);
        sendResponse(res, 403, null, 'Invalid user');
      });
    // next();
  } catch (err) {
    sendResponse(res, 403, null, 'Invalid Token');
  }
};

const isAdmin = level => level === constants.adminLevel;
const isAttendant = level => level === constants.attendantLevel;

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
  verifyProductInput, verifyCartItem, isAdmin, isAttendant, verifyOrderInput,
};
