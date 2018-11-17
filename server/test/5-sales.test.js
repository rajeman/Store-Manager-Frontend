import expect from 'expect';
import request from 'supertest';
import app from '../app';

let timeCheckedOut = 1;

describe('POST /sales', () => {
  it('should create sale order for an attendant', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
      products:
          [
            {
              productId: 3,
              productQuantity: 7,
            },
            {
              productId: 4,
              productQuantity: 6,
            },
            {
              productId: 2,
              productQuantity: 10,
            },
          ],
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('Successfully created');
      expect(response.body.orderDetails.order_price).toBe(990);
      expect(response.body.orderDetails.order_quantity).toBe(23);
      timeCheckedOut = response.body.orderDetails.time_checked_out;
    }));

  it('should not create sale order with empty body request', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Products list missing');
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

  it('should not create sale order with invalid product id', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
      products:
          [{ productId: 't', productQuantity: 7 }],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('product id and quantity should be positive integers');
    }));

  it('should not create sale order with invalid product quantity', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
      products:
          [{ productId: '3', productQuantity: 'yi' }],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('product id and quantity should be positive integers');
    }));

  it('should not create sale order with repeated product', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
      products:
          [{ productId: 3, productQuantity: 20 }, { productId: 2, productQuantity: 8 }, { productId: 3, productQuantity: 5 }],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('product with id 3 is ordered twice');
    }));

  it('should not create sale order for non existing product', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
      products:
          [{ productId: 7, productQuantity: 20 }, { productId: 2, productQuantity: 8 }, { productId: 3, productQuantity: 5 }],
    })
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('product with id 7 does not exist');
    }));

  it('should not create sale order for product quantity greater than available quantity', () => request(app)
    .post('/api/v1/sales')
    .send({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI',
      products:
          [{ productId: 2, productQuantity: 8 }, { productId: 3, productQuantity: 295 }],
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('is greater than available quantity (293)');
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
      expect(response.body.orders).toBeTruthy();
      expect(response.body.orders).toHaveLength(1);
    }));

  it('should not fetch all sale records for  an attendant', () => request(app)
    .get('/api/v1/sales/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized');
      expect(response.body.orders).toBeFalsy();
    }));

  it('should not fetch any sale record for  non authenticated user', () => request(app)
    .get('/api/v1/sales/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid Token');
      expect(response.body.orders).toBeFalsy();
    }));
});

describe('GET /sales :id', () => {
  it('should fetch details of valid sale record for admin', () => request(app)
    .get(`/api/v1/sales/${timeCheckedOut}`)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.orderDetails).toBeTruthy();
      expect(response.body.orderDetails).toHaveLength(3);
    }));

  it('should fetch details of valid sale record for the attendant that created it', () => request(app)
    .get(`/api/v1/sales/${timeCheckedOut}`)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.orderDetails).toBeTruthy();
      expect(response.body.orderDetails).toHaveLength(3);
    }));

  it('should return server error with non integer id', () => request(app)
    .get('/api/v1/sales/id')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(500)
    .then((response) => {
      expect(response.body.error).toContain('server error');
    }));

  it('should not fetch details of a non-existing sale record', () => request(app)
    .get('/api/v1/sales/3')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('not found');
      expect(response.body.orderDetails).toBeFalsy();
    }));

  it('should not fetch details of sale record for the attendant that did not create it', () => request(app)
    .get(`/api/v1/sales/${timeCheckedOut}`)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgR29sZCIsImVtYWlsIjoibXJnb2xkQGdtYWlsLmNvbSIsInVzZXJJZCI6MywibGV2ZWwiOjEsImlhdCI6MTU0MDk3NzY0Mn0.-xA2RymKHanoJMLbSh0dI0UNBzvLrj35gwngEvREpqU')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized to view this order');
      expect(response.body.orderDetails).toBeFalsy();
    }));
});
