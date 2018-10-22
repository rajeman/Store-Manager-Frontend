'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var orders = {
  ordersList: [{
    orderId: 1,
    productsArray: [{
      productId: 2,
      quantity: 5,
      pricePerProduct: 7
    }, {
      productId: 1,
      quantity: 7,
      pricePerProduct: 18
    }],
    attendantId: 1,
    orderDate: '2018-09-14T06:33:09.250Z',
    totalPrice: 161
  }],

  lastOrderId: 1
};

var ordersMap = new Map();
orders.ordersList.forEach(function (order) {
  ordersMap.set(String(order.orderId), order);
});
exports.orders = orders;
exports.ordersMap = ordersMap;
//# sourceMappingURL=orders.js.map