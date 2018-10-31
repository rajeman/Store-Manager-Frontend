import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { createProduct } from '../crud/db-query';

describe('PUT /sales', () => {
  before((done) => {
    createProduct({
      productName: 'Bluetooth Headset',
      price: 18,
      productQuantity: 1000,
      minimumInventory: 150,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTgzNjR9.oXXINp8rYzHHzdlAfRpwGjE4Xvw7zF_TE2gdXDpROBQ',
    }).then(() => {
      done();
    }).catch((e) => {
      console.log(e);
      done(e);
    });
  });
  // product id is 2 because it is the second added product in the new table.
  // product.test.js is executed as test files were sorted with --sort.

  it('should add specified product to cart for an attendant', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: 2,
      productQuantity: 10,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('Bluetooth Headset');
    }));

  it('should not add specified product to cart for an attendant with inactive account', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: 2,
      productQuantity: 10,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjo5NywibGV2ZWwiOjEsImlhdCI6MTU0MDUxMDQ4Mn0.33jlhGMWr103MtOEgYkvX3xK33cr4Gn4FY9ZlOeO5JE',
    })
    .set('Accept', 'application/json')
    .expect(500)
    .then((response) => {
      expect(response.body.error).toContain('server error');
    }));

  it('should not add specified product to cart with invalid token', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: 2,
      productQuantity: 10,
      token: 'dHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjo5NywibGV2ZWwiOjEsImlhdCI6MTU0MDUxMDQ4Mn0.33jlhGMWr103MtOEgYkvX3xK33cr4Gn4FY9ZlOeO5JE',
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid');
    }));

  it('should not add specified product to cart for an admin', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: 2,
      productQuantity: 10,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw',
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized');
    }));

  it('should not add a product to cart with invalid id', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: 5,
      productQuantity: 10,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('does not exist');
    }));


  it('should unprocessable entity for invalid input', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: -5,
      productQuantity: -10,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(422)
    .then((response) => {
      expect(response.body.error).toContain('Invalid product');
    }));

  it('should return bad request if product is greater than available quantity', () => request(app)
    .put('/api/v1/sales')
    .send({
      productId: 2,
      productQuantity: 995,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('greater than available quantity');
    }));

  it('should reduce the amount of available products by the amount added to cart', () => request(app)
    .get('/api/v1/products/2')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.product[0].product_id).toBe(2);
      expect(response.body.product[0].product_quantity).toBe(990);
    }));
});


describe('POST /sales', () => {
  it('should create sale order for an attendant', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('Successfully created');
      expect(response.body.orderId).toBeTruthy();
    }));

  it('should not create sale order when cart is empty', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('cart is empty');
      expect(response.body.orderId).toBeFalsy();
    }));

  it('should return authorization error for an admin', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw',
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized');
    }));

  it('should return authorization error for a non user', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'faketoken',
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid Token');
    }));
});

describe('GET /sales', () => {
  it('should fetch sales record for an admin', () => request(app)
    .get('/api/v1/sales/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.ordersArray).toBeTruthy();
      expect(response.body.ordersArray).toHaveLength(1);
    }));

  it('should not fetch any sale record for  an attendant', () => request(app)
    .get('/api/v1/sales/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized');
      expect(response.body.ordersArray).toBeFalsy();
    }));

  it('should not fetch any sale record for  non authenticated user', () => request(app)
    .get('/api/v1/sales/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid Token');
      expect(response.body.ordersArray).toBeFalsy();
    }));
});

describe('GET /sales :id', () => {
  it('should fetch details of valid sale record for admin', () => request(app)
    .get('/api/v1/sales/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.orderDetails).toBeTruthy();
      expect(response.body.orderDetails).toHaveLength(1);
    }));

  it('should fetch details of valid sale record for the attendant that created it', () => request(app)
    .get('/api/v1/sales/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.orderDetails).toBeTruthy();
      expect(response.body.orderDetails).toHaveLength(1);
    }));

  it('should not fetch details of an invalid sale record', () => request(app)
    .get('/api/v1/sales/3')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('not found');
      expect(response.body.orderDetails).toBeFalsy();
    }));

  it('should not fetch details of sale record for the attendant that did not create it', () => request(app)
    .get('/api/v1/sales/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgR29sZCIsImVtYWlsIjoibXJnb2xkQGdtYWlsLmNvbSIsInVzZXJJZCI6MywibGV2ZWwiOjEsImlhdCI6MTU0MDk3NzY0Mn0.-xA2RymKHanoJMLbSh0dI0UNBzvLrj35gwngEvREpqU')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized');
      expect(response.body.orderDetails).toBeFalsy();
    }));
});
