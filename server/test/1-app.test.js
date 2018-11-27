import expect from 'expect';
import request from 'supertest';
import app from '../app';

describe('*', () => {
  it('should respond with error message', () => request(app)
    .get('/noroute')
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('Invalid');
    }));
});
