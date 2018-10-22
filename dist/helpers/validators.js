'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPositiveInteger = exports.verifyOrderInput = undefined;

var _products = require('../models/products');

var isPositiveInteger = function isPositiveInteger(s) {
  return (/^\+?[1-9][\d]*$/.test(s)
  );
};

var verifyOrderInput = function verifyOrderInput(req, res, next) {
  var orderInput = req.body;
  var shouldExit = false;
  var orderItem = { productsArray: [] };
  if (orderInput && orderInput.attendantId && isPositiveInteger(orderInput.attendantId)) {
    orderItem.attendantId = orderInput.attendantId;
    var productsArray = orderInput.productsArray;

    if (productsArray instanceof Array && productsArray.length > 0) {
      var duplicateProductsId = new Map();
      productsArray.every(function (inputProduct) {
        if (duplicateProductsId.get(String(inputProduct.productId))) {
          res.status(400).send({
            error: 'product with id ' + inputProduct.productId + ' is ordered twice',
            status: 400
          });
          shouldExit = true;
          return false;
        }
        duplicateProductsId.set(String(inputProduct.productId), 'dummy');

        var product = _products.productsMap.get(String(inputProduct.productId));
        if (product) {
          var inputProductQuantity = inputProduct.quantity;
          if (isPositiveInteger(inputProductQuantity)) {
            var storeQuantity = product.quantity;
            if (storeQuantity >= inputProductQuantity) {
              orderItem.productsArray.push({
                productId: inputProduct.productId,
                quantity: inputProductQuantity,
                pricePerProduct: product.price
              });
              return true;
            }
            res.status(400).send({
              error: 'order quantity (' + inputProductQuantity + ') of ' + product.name + ' with id: ' + product.id + ' is more than available quantity (' + storeQuantity + ')',
              status: 400
            });
            shouldExit = true;
            return false;
          }
          shouldExit = true;
          res.status(400).send({
            error: 'Product quantity should be a positive integer',
            status: 400
          });
          return false;
        }
        shouldExit = true;
        res.status(400).send({
          error: 'Product with id ' + inputProduct.productId + ' does not exist',
          status: 400
        });
        return false;
      });
    } else {
      shouldExit = true;
      res.status(400).send({
        error: 'Array containing products should be provided',
        status: 400
      });
    }
  } else {
    shouldExit = true;
    res.status(403).send({
      error: 'Only attendants can create sales orders. Please specify a valid attendant id',
      status: 403
    });
    return false;
  }
  if (!shouldExit) {
    req.orderItem = orderItem;
    return next();
  }
  return false;
};
exports.verifyOrderInput = verifyOrderInput;
exports.isPositiveInteger = isPositiveInteger;
//# sourceMappingURL=validators.js.map