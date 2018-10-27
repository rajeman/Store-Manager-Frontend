import express from 'express';
import {
  verifyCartItem, ensureToken,
} from '../helpers/validators';
import { getProducts } from '../crud/db-query';

const salesRouter = express.Router();
const attendantLevel = 1;

// salesRouter.post('/', verifyOrderInput, (req, res) => {
//   const { orderItem } = req;
//   orderItem.orderDate = new Date().getTime();

//   let totalPrice = 0;
//   orderItem.productsArray.forEach((product) => {
//     totalPrice += product.pricePerProduct * product.quantity;
//     const storeProduct = productsMap.get(String(product.productId));
//     storeProduct.quantity -= product.quantity;
//   });
//   orderItem.totalPrice = totalPrice;

//   res.send({
//     message: 'Successfully created order',
//     order: orderItem,
//   });
// });

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
        error: 'product does not exist',
      });
      return;
    }
    if (product.productQuantity > result[0].product_quantity) {
      res.status(400).send({
        status: 400,
        error: `Quantity of '${result[0].product_name}' (${product.productQuantity}) with id '${result[0].product_id}' is greater than available quantity (${result[0].product_quantity})`,
      });
    }

    
  }).catch((e) => {
    console.log(e);
    res.status(404).send({
      status: 404,
      error: 'product does not exist',
    });
  });
});

/* salesRouter.post('/', verifyOrderInput, (req, res) => {
  const { orderItem } = req;
  orderItem.orderDate = new Date();
  orderItem.orderId = orders.lastOrderId + 1;
  orders.lastOrderId += 1;
  let totalPrice = 0;
  orderItem.productsArray.forEach((product) => {
    totalPrice += product.pricePerProduct * product.quantity;
    const storeProduct = productsMap.get(String(product.productId));
    storeProduct.quantity -= product.quantity;
  });
  orderItem.totalPrice = totalPrice;
  orders.ordersList.push(orderItem);
  ordersMap.set(String(orderItem.orderId), orderItem);

  res.send({
    message: 'Successfully created order',
    order: orderItem,
  });
}); */

/* salesRouter.get('/', (req, res) => {
  const { level } = req.query;

  if (level !== String(admin)) {
    res.status(403).send({
      error: 'You are not allowed to access this content',
      status: 403,
    });
    return;
  }
  res.send({
    message: 'Successfully fetched orders',
    orders: orders.ordersList,
  });
});
*/
/* salesRouter.get('/:id', (req, res) => {
  const { level, attendantId } = req.query;
  const { id } = req.params;
  const orderDetails = ordersMap.get(String(id));

  if (level === String(admin)) {
    if (orderDetails) {
      res.send({
        message: 'Successfully fetched order',
        orderDetails,
      });
    } else {
      res.status(404).send({
        error: 'Invalid order id',
        status: 404,
      });
    }
    return;
  }

  if (attendantId) {
    if (!orderDetails) {
      res.status(403).send({
        error: 'You are not allowed to access this content',
        status: 403,
      });
      return;
    }
    if (orderDetails && String(orderDetails.attendantId) === attendantId) {
      res.send({
        message: 'Successfully fetched order',
        orderDetails,
      });
      return;
    }
  }
  res.status(403).send({
    error: 'You are not allowed to access this content',
    status: 403,
  });
}); */


export default salesRouter;
