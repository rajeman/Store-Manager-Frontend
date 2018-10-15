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
    }));
});
