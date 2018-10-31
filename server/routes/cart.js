import express from 'express';
import {
  ensureToken,
} from '../helpers/validators';
import sendResponse from '../helpers/responses';
import {
  getCart,
} from '../crud/db-query';
import constants from '../helpers/constants';

const cartRouter = express.Router();


cartRouter.get('/', ensureToken, (req, res) => {
  // query database
  if (req.body.decoded.level !== constants.attendantLevel) {
    sendResponse(res, 403, null, 'You are not authorized to view cart');
    return;
  }
  getCart(req.body.decoded.userId).then((result) => {
    res.status(200).send({
      status: 200,
      message: 'successfully fetched cart',
      cartArray: result,
    });
  }).catch((e) => {
    console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});


export default cartRouter;
