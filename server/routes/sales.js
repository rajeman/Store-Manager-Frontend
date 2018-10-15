import express from 'express';
import { verifyOrderInput } from '../helpers/validators';
import { orders, ordersMap } from '../models/orders';
import { productsMap } from '../models/products';

const salesRouter = express.Router();


salesRouter.post('/', verifyOrderInput, (req, res) => {
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
});


export default salesRouter;
