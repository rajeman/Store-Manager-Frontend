'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _products = require('../models/products');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('POST /products', function () {
  it('should add a new product with valid parameters', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/products').send({
      name: '3D Printer',
      minInvent: 18,
      quantity: 500,
      level: 2,
      price: 9
    }).set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('3D Printer');
      (0, _expect2.default)(_products.products.productsList.length).toBe(3);
      (0, _expect2.default)(_products.products.lastId).toBe(3);
    });
  });

  it('should not add a new product with invalid parameters', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/products').send({
      name: 'Wireless Printer',
      minInvent: 0,
      quantity: 200,
      level: 2,
      price: 5
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('Product name must be at least 3 characters');
      (0, _expect2.default)(_products.products.productsList.length).toBe(3);
      (0, _expect2.default)(_products.products.lastId).toBe(3);
    });
  });
  it('should not allow non-admin to add product', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/products').send({
      name: '3D Printer',
      minInvent: 18,
      quantity: 500,
      level: 1,
      price: 12
    }).set('Accept', 'application/json').expect(403).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('not allowed to modify');
      (0, _expect2.default)(_products.products.productsList.length).toBe(3);
      (0, _expect2.default)(_products.products.lastId).toBe(3);
    });
  });
});

describe('GET /products', function () {
  it('should return all available products', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/products').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.length).toBe(3);
      (0, _expect2.default)(response.body).toEqual(_expect2.default.arrayContaining([{
        id: 1,
        quantity: 12,
        minInvent: 3,
        name: 'Otis Headphone',
        created: '2018-10-14T06:33:09.250Z',
        price: 18
      }]));
    });
  });
});

describe('GET /products:id', function () {
  it('should return the product with id equals :id', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/products/2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('found');
      (0, _expect2.default)(response.body.product).toEqual({
        id: 2,
        quantity: 10,
        minInvent: 5,
        name: 'Extreme GPS',
        created: '2018-10-14T06:38:20.250Z',
        price: 7
      });
    });
  });
  it('should return error with invalid product id', function () {
    return (0, _supertest2.default)(_app2.default).get('/api/v1/products/10').set('Accept', 'application/json').expect(404).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('cannot find');
    });
  });
});
//# sourceMappingURL=products.test.js.map