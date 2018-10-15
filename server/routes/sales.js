import express from 'express';

import { verifyOrderInput } from '../helpers/validators';


const salesRouter = express.Router();


salesRouter.post('/', verifyOrderInput, (req, res) => {

});


export default salesRouter;
