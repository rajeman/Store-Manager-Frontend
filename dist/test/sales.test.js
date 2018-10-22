'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _products = require('../models/products');

var _orders = require('../models/orders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('POST /sales', function () {
  it('should create a new order with valid body input', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: 10
      }, {
        productId: 2,
        quantity: 3
      }]

    }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('Successfully created');
      (0, _expect2.default)(_products.productsMap.get(String(1)).quantity).toBe(2);
      (0, _expect2.default)(_orders.orders.ordersList.length).toBe(2);
      (0, _expect2.default)(_orders.orders.lastOrderId).toBe(2);
      (0, _expect2.default)(_orders.ordersMap.get(String(2))).toBeTruthy();
      (0, _expect2.default)(_orders.ordersMap.get(String(2)).totalPrice).toBe(201);
    });
  });

  it('should return error with invalid attendantId', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: -10,
      productsArray: [{
        productId: 1,
        quantity: 10
      }, {
        productId: 2,
        quantity: 3
      }]

    }).set('Accept', 'application/json').expect(403).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('specify a valid attendant id');
    });
  });

  it('should return error with invalid or empty products array', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: 10,
      productsArray: []
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('products should be provided');
    });
  });

  it('should return error with duplicate product id order', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: 1
      }, {
        productId: 1,
        quantity: 1
      }]
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('is ordered twice');
    });
  });

  it('should return error with invalid product id', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: 10,
      productsArray: [{
        productId: 13,
        quantity: 1
      }, {
        productId: 1,
        quantity: 1
      }]
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('does not exist');
    });
  });

  it('should return error with negative product quantity', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: -10
      }, {
        productId: 2,
        quantity: 3
      }]

    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('quantity should be a positive integer');
    });
  });

  it('should return error with order quantity greater than available quantity', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/sales').send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: 10
      }, {
        productId: 2,
        quantity: 3
      }]

    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('is more than available quantity');
    });
  });
});

describe('GET /sales', function () {
  it('should return all sales order for an admin', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales').query({ level: 2 }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.orders.length).toBe(2);
      (0, _expect2.default)(response.body.message).toContain('Successfully fetched');
    });
  });

  it('should return error for a non admin request', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales').query({ level: 1 }).set('Accept', 'application/json').expect(403).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('not allowed to access');
      (0, _expect2.default)(_orders.orders.ordersList.length).toBe(2);
    });
  });
});

describe('GET /sales:id', function () {
  it('should return the sale record for an admin', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales/1').query({ level: 2 }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('Successfully fetched');
      (0, _expect2.default)(response.body.orderDetails.orderId).toBe(1);
    });
  });

  it('should return invalid sale record for an admin with invalid order id', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales/12').query({ level: 2 }).set('Accept', 'application/json').expect(404).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('Invalid order');
    });
  });

  it('should return the sale record for an the attendant that generated the record', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales/1').query({ attendantId: 1 }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('Successfully fetched');
      (0, _expect2.default)(response.body.orderDetails.orderId).toBe(1);
    });
  });

  it('should return access error for an attendant with invalid order id', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales/12').query({ attendantId: 1 }).set('Accept', 'application/json').expect(403).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('not allowed');
    });
  });

  it('should return access error if attendant did not generate the record', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales/1').query({ attendantId: 10 }).set('Accept', 'application/json').expect(403).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('not allowed');
    });
  });

  it('should return access error if attendant id not provided', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/sales/1').set('Accept', 'application/json').expect(403).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('not allowed');
    });
  });
});
//# sourceMappingURL=sales.test.js.map