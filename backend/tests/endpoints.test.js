import { expect } from 'chai';
import app from '../src/index.js';
import supertest from 'supertest';

const requester = supertest(app);

let token;

describe('API Tests', () => {
  describe('POST /login', () => {
    it('should login successfully and return a token', async () => {
      const res = await requester.post('/login').send({ email: 'cordeiromariano17@gmail.com', password: 'Cordeiro' });
      const { status } = res;
      const cookie = res.headers['set-cookie'][0];

      expect(status).to.equal(200);
      expect(cookie).to.be.ok;
      token = cookie;
    });
  });

  describe('GET /subscriptions/categories', () => {
    it('should get all categories', async () => {
      const res = await requester.get('/subscriptions/categories').set('Cookie', token);
      const { status, _body } = res;

      expect(status).to.equal(200);
      expect(_body.data.categoriesAvailables).to.be.an('array');
    });
  });

  describe('POST /subscriptions', () => {
    it('should subscribe user to categories', async () => {
      const res = await requester
        .post('/subscriptions')
        .set('Cookie', token)
        .send({ phone: '+1234567890', categories: ['music'] });

      const { status } = res;
      expect(status).to.equal(201);
    });
  });

  describe('GET /subscriptions/:phoneNumber', () => {
    it('should get user subscriptions by phone', async () => {
      const res = await requester.get('/subscriptions/+1234567890').set('Cookie', token);

      const { status, _body } = res;

      expect(status).to.equal(200);
      expect(_body.data.categories).to.include('music');
    });
  });

  describe('DELETE /subscriptions', () => {
    it('should delete a subscription', async () => {
      const res = await requester.delete('/subscriptions').set('Cookie', token).send({ category: 'music' });

      const { status } = res;

      expect(status).to.equal(200);
    });
  });

  describe('POST /login/logout', () => {
    it('should logout user', async () => {
      const res = await requester.post('/login/logout').set('Cookie', token);

      const { status } = res;

      expect(status).to.equal(200);
    });
  });
});
