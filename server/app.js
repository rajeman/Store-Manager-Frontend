import express from 'express';
import bodyParser from 'body-parser';
import {} from './helpers/config';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import productsRouter from './routes/products';
import salesRouter from './routes/sales';
import authRouter from './routes/auth';
import userRouter from './routes/user';


const swaggerDocument = require('../swagger.json');

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/sales', salesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Store Manager' });
});
app.use('/', express.static('UI'));
app.use('*', (req, res) => {
  res.status(404).send({ error: 'Invalid Route' });
});
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

export default app;
