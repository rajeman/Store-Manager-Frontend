import express from 'express';
import sendResponse from '../helpers/responses';

import {
  ensureToken,
} from '../helpers/validators';
import { getUser } from '../crud/db-query';

const userRouter = express.Router();


userRouter.get('/', ensureToken, (req, res) => {
  getUser(req.body.decoded.email)
    .then((result) => {
      if (result.length > 0) {
        const userDetails = {};
        userDetails.username = result[0].user_name;
        userDetails.email = result[0].user_email;
        userDetails.userId = result[0].user_id;
        userDetails.level = result[0].user_level;
        userDetails.totalOrders = result[0].total_orders;
        res.send({
          message: 'successfully fetched details',
          userDetails,
        });
      } else {
        sendResponse(res, 404, null, 'User not found');
      }
    })
    .catch(() => {
      // console.log(e);
      sendResponse(res, 500, null, 'Internal server error');
    });
});


export default userRouter;
