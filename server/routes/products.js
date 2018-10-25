import express from 'express';
import {
  sendServerError, ensureToken, verifyProductInput,
} from '../helpers/validators';
import { getUser, createProduct, getProducts } from '../crud/db-query';


const productsRouter = express.Router();

const adminLevel = 2;

productsRouter.post('/', verifyProductInput, ensureToken, (req, res) => {
  if (req.body.decoded.level !== adminLevel) {
    res.status(403).send({
      error: 'Your are not authorized to modify this content',
      status: 403,
    });
    return;
  }
  // query database
  getUser(req.body.decoded.email)
    .then(() => {
      createProduct(req.body).then(() => {
        res.status(201).send({
          status: 201,
          message: `'${req.body.productName}' was successfully added`,
        });
      }).catch((e) => {
        console.log(e);
        sendServerError(res);
      });
      // res.send(result);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send({
        error: 'Invalid user',
        status: 404,
      });
    });
});

productsRouter.get('/', ensureToken, (req, res) => {
  // query database
  getProducts().then((result) => {
    res.status(200).send({
      status: 200,
      message: 'successfully fetched products',
      productsArray: result,
    });
  }).catch((e) => {
    console.log(e);
    sendServerError(res);
  });
});

productsRouter.get('/:id', ensureToken, (req, res) => {
  // query database
  getProducts(req.params.id).then((result) => {
    if (result.length) {
      res.status(200).send({
        status: 200,
        message: 'successfully fetched product',
        product: result,
      });
    } else {
      res.status(404).send({
        status: 404,
        error: 'Product not found',
      });
    }
  }).catch((e) => {
    console.log(e);
    sendServerError(res);
  });
});


export default productsRouter;
