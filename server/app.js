import express from 'express';
import bodyParser from 'body-parser';
import productsRouter from './routes/products';
import salesRouter from './routes/sales';
import authRouter from './routes/auth';


const port = process.env.PORT || 5008;
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/sales', salesRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Store Manager' });
});
app.use('*', (req, res) => {
  res.status(404).send({ error: 'Invalid Route' });
});
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

export default app;
