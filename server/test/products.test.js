import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { products } from '../models/products';

describe('POST /products', () => {
  it('should add a new product with valid parameters', () => request(app)
    .post('/api/v1/products')
    .send({
      name: '3D Printer',
      minInvent: 18,
      quantity: 500,
      level: 2,
      price: 9,
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('3D Printer');
      expect(products.productsList.length).toBe(3);
      expect(products.lastId).toBe(3);
    }));

  it('should not add a new product with invalid parameters', () => request(app)
    .post('/api/v1/products')
    .send({
      name: 'Wireless Printer',
      minInvent: 0,
      quantity: 200,
      level: 2,
      price: 5,
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Product name must be at least 3 characters');
      expect(products.productsList.length).toBe(3);
      expect(products.lastId).toBe(3);
    }));
  it('should not allow non-admin to add product', () => request(app)
    .post('/api/v1/products')
    .send({
      name: '3D Printer',
      minInvent: 18,
      quantity: 500,
      level: 1,
      price: 12,
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not allowed to modify');
      expect(products.productsList.length).toBe(3);
      expect(products.lastId).toBe(3);
    }));
});


describe('GET /products', () => {
  it('should return all available products', () => request(app)
    .get('/api/v1/products')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(3);
      expect(response.body).toEqual(
        expect.arrayContaining([{
          id: 1,
          quantity: 12,
          minInvent: 3,
          name: 'Otis Headphone',
          created: '2018-10-14T06:33:09.250Z',
          price: 18,
        }]),
      );
    }));
});

describe('GET /products:id', () => {
  it('should return the product with id equals :id', () => request(app)
    .get('/api/v1/products/2')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('found');
      expect(response.body.product).toEqual({
        id: 2,
        quantity: 10,
        minInvent: 5,
        name: 'Extreme GPS',
        created: '2018-10-14T06:38:20.250Z',
        price: 7,
      });
    }));
  it('should return error with invalid product id', () => request(app)
    .get('/api/v1/products/10')
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('cannot find');
    }));
});
