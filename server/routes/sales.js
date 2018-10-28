import express from 'express';
import {
  verifyCartItem, ensureToken, sendServerError,
} from '../helpers/validators';
import { getProducts, addToCart } from '../crud/db-query';

const salesRouter = express.Router();
const attendantLevel = 1;

salesRouter.put('/', verifyCartItem, ensureToken, (req, res) => {
  if (req.body.decoded.level !== attendantLevel) {
    res.status(403).send({
      error: 'You are not authorized to add to cart',
      status: 403,
    });
    return;
  }
  const product = req.body.cartItem;
  getProducts(product.productId).then((result) => {
    if (result.length <= 0) {
      res.status(404).send({
        status: 404,
        error: `product with id '${product.productId}' does not exist`,
      });
      return;
    }

    if (product.productQuantity > result[0].product_quantity) {
      res.status(400).send({
        status: 400,
        error: `Quantity of '${result[0].product_name}' (${product.productQuantity}) with id '${result[0].product_id}' is greater than available quantity (${result[0].product_quantity})`,
      });
      return;
    }

    const cartItem = {
      productQuantity: product.productQuantity,
      userId: req.body.decoded.userId,
      productId: result[0].product_id,
      totalPrice: result[0].product_price * product.productQuantity,
      timeAdded: (new Date()).getTime(),
    };

    addToCart(cartItem).then((re) => {
      res.send({
        message: 'Successfully created order',
        order: re[0],
      });
    }).catch((e) => {
      sendServerError(res);
      console.log(e);
    });
  }).catch((e) => {
    console.log(e);
    res.status(404).send({
      status: 404,
      error: 'product does not exist',
    });
  });
});



export default salesRouter;
