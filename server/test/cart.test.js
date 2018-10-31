import expect from 'expect';
import request from 'supertest';
import app from '../app';


describe('GET /cart', () => {
  it('should fetch the items in an attendant\'s cart', () => request(app)
    .get('/api/v1/cart/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJNciBBdHRlbmRhbnQgQnJvd24iLCJlbWFpbCI6Im1yc21pdGhAZ21haWwuY29tIiwidXNlcklkIjoyLCJsZXZlbCI6MSwiaWF0IjoxNTQwNzMxMzk2fQ.x_IZlaOaBunwr9ablT_q4XxCCkxY-v963f5CIQ81DsI')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.cartArray).toBeTruthy();
    }));

  it('should not fetch cart for an admin', () => request(app)
    .get('/api/v1/cart/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('not authorized');
      expect(response.body.cartArray).toBeFalsy();
    }));

  it('should not fetch cart for non authorized user', () => request(app)
    .get('/api/v1/cart/')
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid Token');
      expect(response.body.cartArray).toBeFalsy();
    }));
});
