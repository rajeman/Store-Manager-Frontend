import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { clearTable } from '../crud/db-query';

const productsTable = 'products';

describe('POST /products', () => {
  before((done) => {
    clearTable(productsTable)
      .then(() => {
        done();
      })
      .catch(e => done(e));
  });
  it('should add a new product for an admin', () => request(app)
    .post('/api/v1/products')
    .send({
      productName: 'Authentic 3D Projector',
      price: 437,
      minimumInventory: 7,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw',
    })
    .set('Accept', 'application/json')
    .expect(201)
    .then((response) => {
      expect(response.body.message).toContain('Authentic 3D Projector');
    }));

  it('should not add a new product for a non admin', () => request(app)
    .post('/api/v1/products')
    .send({
      productName: 'Wireless Mouse',
      price: 7,
      minimumInventory: 65,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJmZ2RmZ2RyZyIsImVtYWlsIjoiemlAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNDU4NDA3fQ.tnEcnTPnPRT-h4bk69RmA90hi436j3c2oSuJMb1vx5M',
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid');
    }));
  it('should return 422 error with invalid request body', () => request(app)
    .post('/api/v1/products')
    .send({
      productName: 'Wireless Keyboard',
      price: 4.37,
      minimumInventory: 7,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTgzNjR9.oXXINp8rYzHHzdlAfRpwGjE4Xvw7zF_TE2gdXDpROBQ',
    })
    .set('Accept', 'application/json')
    .expect(422)
    .then((response) => {
      expect(response.body.error).toContain('Invalid');
    }));
});
