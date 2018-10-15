import { productsMap } from '../models/products';
import { orders } from '../models/orders';

const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);


const verifyOrderInput = (req, res, next) => {
  const orderInput = req.body;

  const orderItem = {};
  if (orderInput && orderInput.attendantId && isPositiveInteger(orderInput.attendantId)) {
    const { productsArray } = orders;
    if (productsArray instanceof Array) {
      productsArray.forEach((inputProduct) => {
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
            } else {
              res.status(400).send({
                error: `order quantity (${inputProductQuantity}) of ${product.name} with id: 
                  ${product.id} is more than 
                  available quantity (${storeQuantity})`,
                status: 400,
              });
            }
          } else {
            res.status(400).send({
              error: 'Product quantity should be a positive integer',
              status: 400,
            });
          }
        } else {
          res.status(400).send({
            error: `Product with id ${inputProduct.productId} does not exist`,
            status: 400,
          });
        }
      });
      req.orderItem = orderItem;
      next();
    } else {
      res.status(400).send({
        error: 'Array containing products should be specified',
        status: 400,
      });
    }
  } else {
    res.status(403).send({
      error: 'Only attendants can create sales orders. Please specify attendant id',
      status: 403,
    });
  }
};
export { verifyOrderInput, isPositiveInteger };
