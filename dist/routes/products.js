'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('../models/products');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPositiveInteger = function isPositiveInteger(s) {
  return (/^\+?[1-9][\d]*$/.test(s)
  );
};
var admin = 2;
var productsRouter = _express2.default.Router();

var verifyParameters = function verifyParameters(req, res, next) {
  var parameter = req.body;
  if (parameter && parameter.level !== admin) {
    res.status(403).send({
      error: 'You are not allowed to modify this content',
      status: 403
    });
    return;
  }
  if (parameter && parameter.name && parameter.name.trim().length > 2 && isPositiveInteger(parameter.minInvent) && isPositiveInteger(parameter.quantity) && isPositiveInteger(parameter.price)) {
    next();
  } else {
    res.status(400).send({
      error: 'Product name must be at least 3 characters with the minimum inventory, price and quantity greater than zero',
      status: 400
    });
  }
};

productsRouter.post('/', verifyParameters, function (req, res) {
  var reqBody = req.body;
  var newProduct = {
    id: _products.products.lastId + 1,
    quantity: reqBody.quantity,
    minInvent: reqBody.minInvent,
    price: reqBody.price,
    name: reqBody.name,
    created: new Date()
  };
  _products.products.productsList.push(newProduct);
  _products.products.lastId += 1;
  _products.productsMap.set(String(newProduct.id), newProduct);
  res.send({
    message: '\'' + newProduct.name + '\' successfully added'
  });
});

productsRouter.get('/', function (req, res) {
  res.send(_products.products.productsList.filter(function (product) {
    return product.quantity > 0;
  }));
});

productsRouter.get('/:id', function (req, res) {
  var product = _products.productsMap.get(String(req.params.id));
  if (product) {
    res.send({
      message: 'product found',
      product: product
    });
  } else {
    res.status(404).send({
      error: 'cannot find product'
    });
  }
});

exports.default = productsRouter;
//# sourceMappingURL=products.js.map