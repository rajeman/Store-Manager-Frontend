import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { productsMap } from '../models/products';
import { orders, ordersMap } from '../models/orders';

describe('POST /sales', () => {
  it('should create a new order with valid body input', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: 10,
      },
      {
        productId: 2,
        quantity: 3,
      }],

    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('Successfully created');
      expect(productsMap.get(String(1)).quantity).toBe(2);
      expect(orders.ordersList.length).toBe(2);
      expect(orders.lastOrderId).toBe(2);
      expect(ordersMap.get(String(2))).toBeTruthy();
      expect(ordersMap.get(String(2)).totalPrice).toBe(201);
    }));

  it('should return error with invalid attendantId', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: -10,
      productsArray: [{
        productId: 1,
        quantity: 10,
      },
      {
        productId: 2,
        quantity: 3,
      }],

    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('specify a valid attendant id');
    }));

  it('should return error with invalid or empty products array', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: 10,
      productsArray: [],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('products should be provided');
    }));

  it('should return error with duplicate product id order', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: 1,
      },
      {
        productId: 1,
        quantity: 1,
      }],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('is ordered twice');
    }));

  it('should return error with invalid product id', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: 10,
      productsArray: [{
        productId: 13,
        quantity: 1,
      },
      {
        productId: 1,
        quantity: 1,
      }],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('does not exist');
    }));

  it('should return error with negative product quantity', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: -10,
      },
      {
        productId: 2,
        quantity: 3,
      }],

    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('quantity should be a positive integer');
    }));

  it('should return error with order quantity greater than available quantity', () => request(app)
    .post('/api/v1/sales')
    .send({
      attendantId: 10,
      productsArray: [{
        productId: 1,
        quantity: 10,
      },
      {
        productId: 2,
        quantity: 3,
      }],

    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('is more than available quantity');
    }));
});

describe('GET /sales', () => {
  it('should return all sales order for an admin', () => request(app)
    .get('/api/v1/sales')
    .query({ level: 2 })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.orders.length).toBe(2);
      expect(response.body.message).toContain('Successfully fetched');
    }));

  it('should return error for a non admin request', () => request(app)
    .get('/api/v1/sales')
    .query({ level: 1 })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not allowed to access');
      expect(orders.ordersList.length).toBe(2);
    }));
});
