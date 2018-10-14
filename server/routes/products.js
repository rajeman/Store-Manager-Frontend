import express from 'express';
import products from '../models/products';


const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);
const admin = 2;
const productsRouter = express.Router();

const verifyParameters = (req, res, next) => {
  const parameter = req.body;
  if (parameter && parameter.level !== admin) {
    res.status(403).send({
      error: 'You are not allowed to modify this content',
      status: 403,
    });
    return;
  }
  if (parameter && parameter.name.length > 2 && isPositiveInteger(parameter.minInvent)
    && isPositiveInteger(parameter.quantity)) {
    next();
  } else {
    res.status(400).send({
      error: 'Product name must be at least 3 characters with the minimum inventory and quantity greater than zero',
      status: 400,
    });
  }
};


productsRouter.post('/', verifyParameters, (req, res) => {
  const reqBody = req.body;
  const newProduct = {
    id: products.lastId + 1,
    quantity: reqBody.quantity,
    minInvent: reqBody.minInvent,
    name: reqBody.name,
    created: new Date(),
  };
  if (products.productsList.push(newProduct)) {
    products.lastId += 1;
    console.log(products);
    res.send({
      message: `'${newProduct.name}' successfully added`,
    });
  } else {
    res.status(500).send({
      error: 'An unknown error occured',
      status: 500,
    });
  }
});


export default productsRouter;
