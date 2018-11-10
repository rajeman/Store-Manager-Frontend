import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { clearTable } from '../crud/db-query';

describe('GET /user', () => {
  it('should fetch the user with the token', () => request(app)
    .get('/api/v1/user/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('successfully fetched');
      expect(response.body.userDetails.username).toContain('Piper');
    }));

  it('should not fetch product for user with invalid token ', () => request(app)
    .get('/api/v1/user/')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjMwMywidXNlcm5hbWUiOiJKZWZmZXJzb24gUGlwZXIiLCJlbWFpbCI6ImpwaXBlckBhZG1pbi5jb20iLCJ1c2VySWQiOjEsImxldmVsIjoyLCJpYXQiOjE1NDA0NTMyMDJ9.HplqH5tLSIr5_l69D2FuUs3mpyBqtZjFSEouLSuIFGw')
    .expect(403)
    .then((response) => {
      expect(response.body.error).toContain('Invalid');
    }));
});