import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { getUser, clearTable } from '../crud/db-query';

const usersTable = 'users';

describe('POST /signup', () => {
  before((done) => {
    clearTable(usersTable)
      .then(() => {
        done();
      })
      .catch(e => done(e));
  });
  it('should create a new user with valid data', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr Smith',
      email: 'mrsmith@gmail.com',
      password: 'crazysmithman8',
      rePassword: 'crazysmithman8',
      level: 1,
    })
    .set('Accept', 'application/json')
    .expect(201)
    .then((response) => {
      expect(response.body.message).toContain('account created');
      // ensure user is in database
      getUser('mrsmith@gmail.com')
        .then((result) => {
          expect(result[0].user_email).toBe('mrsmith@gmail.com');
        });
    }));
  it('should not create user with invalid username', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr',
      email: 'rajeman@gmail.com',
      password: 'smithman8',
      rePassword: 'smithman8',
      level: 1,
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Invalid input');
      // ensure user is not in database
      getUser('invalidEmail.com')
        .then((result) => {
          expect(result.length).toBe(0);
        });
    }));

  it('should not create user with non matching passwords', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr User',
      email: 'rajeman@gmail.com',
      password: 'smithmat',
      rePassword: 'smithman',
      level: 1,
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Invalid input');
    }));

  it('should not create user with level unspecified', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr Newuser',
      email: 'mruser@gmail.com',
      password: 'smithman',
      rePassword: 'smithman',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Invalid input');
    }));

  it('should not create user with invalid email', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr Newuser',
      email: 'mrusegmail.com',
      password: 'smithman',
      rePassword: 'smithman',
      level: 1,
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('Invalid input');
    }));

  it('should not create new user with email in use', () => request(app)
    .post('/api/v1/auth/signup')
    .send({
      name: 'Mr Smith',
      email: 'mrsmith@gmail.com',
      password: 'crazysmithman8',
      rePassword: 'crazysmithman8',
      level: 1,
    })
    .set('Accept', 'application/json')
    .expect(409)
    .then((response) => {
      expect(response.body.error).toContain('in use');
    }));
});
