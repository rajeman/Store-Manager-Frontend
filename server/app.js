import express from 'express';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5008;
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Store Manager' });
});
app.get('*', (req, res) => {
  res.status(404).send({ error: 'Invalid Route' });
});
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
