'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validators = require('../helpers/validators');

var _orders = require('../models/orders');

var _products = require('../models/products');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var salesRouter = _express2.default.Router();
var admin = 2;

salesRouter.post('/', _validators.verifyOrderInput, function (req, res) {
  var orderItem = req.orderItem;

  orderItem.orderDate = new Date();
  orderItem.orderId = _orders.orders.lastOrderId + 1;
  _orders.orders.lastOrderId += 1;
  var totalPrice = 0;
  orderItem.productsArray.forEach(function (product) {
    totalPrice += product.pricePerProduct * product.quantity;
    var storeProduct = _products.productsMap.get(String(product.productId));
    storeProduct.quantity -= product.quantity;
  });
  orderItem.totalPrice = totalPrice;
  _orders.orders.ordersList.push(orderItem);
  _orders.ordersMap.set(String(orderItem.orderId), orderItem);

  res.send({
    message: 'Successfully created order',
    order: orderItem
  });
});

salesRouter.get('/', function (req, res) {
  var level = req.query.level;


  if (level !== String(admin)) {
    res.status(403).send({
      error: 'You are not allowed to access this content',
      status: 403
    });
    return;
  }
  res.send({
    message: 'Successfully fetched orders',
    orders: _orders.orders.ordersList
  });
});

salesRouter.get('/:id', function (req, res) {
  var _req$query = req.query,
      level = _req$query.level,
      attendantId = _req$query.attendantId;
  var id = req.params.id;

  var orderDetails = _orders.ordersMap.get(String(id));

  if (level === String(admin)) {
    if (orderDetails) {
      res.send({
        message: 'Successfully fetched order',
        orderDetails: orderDetails
      });
    } else {
      res.status(404).send({
        error: 'Invalid order id',
        status: 404
      });
    }
    return;
  }

  if (attendantId) {
    if (!orderDetails) {
      res.status(403).send({
        error: 'You are not allowed to access this content',
        status: 403
      });
      return;
    }
    if (orderDetails && String(orderDetails.attendantId) === attendantId) {
      res.send({
        message: 'Successfully fetched order',
        orderDetails: orderDetails
      });
      return;
    }
  }
  res.status(403).send({
    error: 'You are not allowed to access this content',
    status: 403
  });
});

exports.default = salesRouter;
//# sourceMappingURL=sales.js.map