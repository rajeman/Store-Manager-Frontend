import expect from 'expect';
import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('should respond with welcome message', () => request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.message).toContain('Welcome');
    }));
});

describe('*', () => {
  it('should respond with error message', () => request(app)
    .get('/noroute')
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.error).toContain('Invalid');
    }));
});
