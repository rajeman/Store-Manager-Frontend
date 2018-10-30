import express from 'express';
import {
  verifyCartItem, ensureToken,
} from '../helpers/validators';
import sendResponse from '../helpers/responses';
import {
  getProducts, addToCart, createOrder, getOrders,
} from '../crud/db-query';
import constants from '../helpers/constants';

const salesRouter = express.Router();


salesRouter.put('/', verifyCartItem, ensureToken, (req, res) => {
  if (req.body.decoded.level !== constants.attendantLevel) {
    sendResponse(res, 403, null, 'You are not authorized to add to cart');
    return;
  }
  const product = req.body.cartItem;
  getProducts(product.productId).then((result) => {
    if (result.length <= 0) {
      sendResponse(res, 404, null, `product with id '${product.productId}' does not exist`);
      return;
    }

    if (product.productQuantity > result[0].product_quantity) {
      sendResponse(res, 400, null,
        `Quantity of '${result[0].product_name}' (${product.productQuantity}) with id '${result[0].product_id}' is greater than available quantity (${result[0].product_quantity})`);

      return;
    }

    const cartItem = {
      productQuantity: product.productQuantity,
      userId: req.body.decoded.userId,
      productId: result[0].product_id,
      totalPrice: result[0].product_price * product.productQuantity,
      timeAdded: (new Date()).getTime(),
    };

    addToCart(cartItem).then(() => {
      sendResponse(res, 200, `Successfully added '${result[0].product_name}' to cart`);
    }).catch(() => {
      sendResponse(res, 500, null, 'Internal server error');
      // console.log(e);
    });
  }).catch((e) => {
    console.log(e);
    sendResponse(res, 404, null, 'product does not exist');
  });
});

salesRouter.post('/', ensureToken, (req, res) => {
  if (req.body.decoded.level !== constants.attendantLevel) {
    sendResponse(res, 403, null, 'You are not authorized to add to create order');
    return;
  }
  const timeCheckedOut = (new Date()).getTime();
  const orderDetails = {
    userId: req.body.decoded.userId,
    timeCheckedOut,
  };
  createOrder(orderDetails).then((result) => {
    if (result < 0) {
      sendResponse(res, 400, null, 'your cart is empty');
      return;
    }
    res.send({
      message: 'Successfully created order',
      status: 200,
      orderId: timeCheckedOut,
    });
  }).catch((e) => {
    // console.log(e);
    if (e.code === '23502') { // error code for non null constraint
      sendResponse(res, 400, null, 'your cart is empty');
      return;
    }
    sendResponse(res, 500, null, 'Internal server error');
  });
});

salesRouter.get('/', ensureToken, (req, res) => {
  // query database
  if (req.body.decoded.level !== constants.adminLevel) {
    sendResponse(res, 403, null, 'You are not authorized to view sales records');
    return;
  }
  getOrders().then((result) => {
    res.status(200).send({
      status: 200,
      message: 'successfully fetched orders',
      ordersArray: result,
    });
  }).catch((e) => {
    console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});


export default salesRouter;
