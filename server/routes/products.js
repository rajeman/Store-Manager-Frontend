import express from 'express';
import {
  ensureToken, verifyProductInput, isAdmin,
} from '../helpers/validators';
import sendResponse from '../helpers/responses';
import {
  createProduct, getProducts, deleteProducts, updateProducts,
} from '../crud/db-query';
import constants from '../helpers/constants';


const productsRouter = express.Router();


productsRouter.post('/', verifyProductInput, ensureToken, (req, res) => {
  if (!isAdmin(req.body.decoded.level)) {
    sendResponse(res, 403, null, 'Your are not authorized to modify this content');
    return;
  }
  // query database

  createProduct(req.body).then(() => {
    sendResponse(res, 201, `'${req.body.productName}' was successfully added`);
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
  // res.send(result);
});

productsRouter.get('/', ensureToken, (req, res) => {
  // query database
  getProducts().then((result) => {
    res.status(200).send({
      status: 200,
      message: 'successfully fetched products',
      productsArray: result,
    });
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
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
      sendResponse(res, 404, null, 'Product not found');
    }
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});

productsRouter.delete('/:id', ensureToken, (req, res) => {
  // query database
  if (!isAdmin(req.body.decoded.level)) {
    sendResponse(res, 403, null, 'Your are not authorized to modify this content');
    return;
  }
  deleteProducts(req.params.id).then((result) => {
    if (result) {
      sendResponse(res, 200, 'successfully deleted product');
    } else {
      sendResponse(res, 404, null, 'Product not found');
    }
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});

productsRouter.put('/:id', verifyProductInput, ensureToken, (req, res) => {
  if (req.body.decoded.level !== constants.adminLevel) {
    sendResponse(res, 403, null, 'You are not authorized to modify this content');
    return;
  }
  // query database
  const queryParams = req.body;
  queryParams.id = req.params.id;
  updateProducts(queryParams).then((result) => {
    if (result) {
      sendResponse(res, 200, 'successfully updated product');
    } else {
      sendResponse(res, 404, null, 'Invalid product');
    }
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});


export default productsRouter;
