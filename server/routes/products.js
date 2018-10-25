import express from 'express';
import {
  sendServerError, ensureToken, verifyProductInput,
} from '../helpers/validators';
import { getUser, createProduct } from '../crud/db-query';


const productsRouter = express.Router();

const adminLevel = 2;

productsRouter.post('/', verifyProductInput, ensureToken, (req, res) => {
  // query database
  if (req.body.decoded.level !== adminLevel) {
    res.status(403).send({
      error: 'Your are not authorized to modify this content',
      status: 403,
    });
    return;
  }
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


export default productsRouter;
