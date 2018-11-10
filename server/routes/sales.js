import express from 'express';
import {
  ensureToken, isAttendant, isAdmin,
} from '../helpers/validators';
import sendResponse from '../helpers/responses';
import {
  createOrder, getOrders,
} from '../crud/db-query';

const salesRouter = express.Router();


salesRouter.post('/', ensureToken, (req, res) => {
  if (!isAttendant(req.body.decoded.level)) {
    sendResponse(res, 403, null, 'You are not authorized to create order');
    return;
  }
  const timeCheckedOut = (new Date()).getTime();
  const orderDetails = {
    userId: req.body.decoded.userId,
    timeCheckedOut,
  };
  createOrder(orderDetails).then((result) => {
    if (result < 0) {
      sendResponse(res, 400, null, 'your cart is empty');
      return;
    }
    res.send({
      message: 'Successfully created order',
      status: 200,
      orderTime: timeCheckedOut,
    });
  }).catch((e) => {
    // console.log(e);
    if (e.code === '23502') { // error code for non null constraint
      sendResponse(res, 400, null, 'your cart is empty');
      return;
    }
    sendResponse(res, 500, null, 'Internal server error');
  });
});

salesRouter.get('/', ensureToken, (req, res) => {
  if (!isAdmin(req.body.decoded.level)) {
    sendResponse(res, 403, null, 'You are not authorized to view sales record');
    return;
  }
  getOrders().then((result) => {
    res.status(200).send({
      status: 200,
      message: 'successfully fetched orders',
      ordersArray: result,
    });
  }).catch(() => {
    sendResponse(res, 500, null, 'Internal server error');
  });
});

salesRouter.get('/:id', ensureToken, (req, res) => {
  // query database
  getOrders(req.params.id).then((result) => {
    if (result.length <= 0) {
      sendResponse(res, 404, null, 'order not found');
      return;
    }
    if (isAdmin(req.body.decoded.level)
        || (isAttendant(req.body.decoded.level)
          && result[0].user_id === req.body.decoded.userId)) {
      res.status(200).send({
        status: 200,
        message: 'successfully fetched order',
        orderDetails: result,
      });
      return;
    }
    sendResponse(res, 403, null, 'You are not authorized to view this order');
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});


export default salesRouter;
