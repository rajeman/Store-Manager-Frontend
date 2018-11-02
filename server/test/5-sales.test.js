import expect from 'expect';
import request from 'supertest';
import app from '../app';


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
      expect(response.body.orderTime).toBeTruthy();
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
      expect(response.body.orderTime).toBeFalsy();
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
