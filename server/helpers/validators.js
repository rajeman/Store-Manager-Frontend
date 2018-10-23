import { productsMap } from '../models/products';

const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);


const verifyOrderInput = (req, res, next) => {
  const orderInput = req.body;
  let shouldExit = false;
  const orderItem = { productsArray: [] };
  if (orderInput && orderInput.attendantId && isPositiveInteger(orderInput.attendantId)) {
    orderItem.attendantId = orderInput.attendantId;
    const { productsArray } = orderInput;
    if (productsArray instanceof Array && productsArray.length > 0) {
      const duplicateProductsId = new Map();
      productsArray.every((inputProduct) => {
        if (duplicateProductsId.get(String(inputProduct.productId))) {
          res.status(400).send({
            error: `product with id ${inputProduct.productId} is ordered twice`,
            status: 400,
          });
          shouldExit = true;
          return false;
        }
        duplicateProductsId.set(String(inputProduct.productId), 'dummy');

        const product = productsMap.get(String(inputProduct.productId));
        if (product) {
          const inputProductQuantity = inputProduct.quantity;
          if (isPositiveInteger(inputProductQuantity)) {
            const storeQuantity = product.quantity;
            if (storeQuantity >= inputProductQuantity) {
              orderItem.productsArray.push({
                productId: inputProduct.productId,
                quantity: inputProductQuantity,
                pricePerProduct: product.price,
              });
              return true;
            }
            res.status(400).send({
              error: `order quantity (${inputProductQuantity}) of ${product.name} with id: ${product.id} is more than available quantity (${storeQuantity})`,
              status: 400,
            });
            shouldExit = true;
            return false;
          }
          shouldExit = true;
          res.status(400).send({
            error: 'Product quantity should be a positive integer',
            status: 400,
          });
          return false;
        }
        shouldExit = true;
        res.status(400).send({
          error: `Product with id ${inputProduct.productId} does not exist`,
          status: 400,
        });
        return false;
      });
    } else {
      shouldExit = true;
      res.status(400).send({
        error: 'Array containing products should be provided',
        status: 400,
      });
    }
  } else {
    shouldExit = true;
    res.status(403).send({
      error: 'Only attendants can create sales orders. Please specify a valid attendant id',
      status: 403,
    });
    return false;
  }
  if (!shouldExit) {
    req.orderItem = orderItem;
    return next();
  }
  return false;
};
export { verifyOrderInput, isPositiveInteger };
