'use strict';

require('@code-fellows/supergoose');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);
const base64 = require('base-64');


describe('testing basic auth routes', () => {
  it('should respond with a user on POST /signup', async () => {
    const response = await request.post('/signup').send({
      username: 'Jason',
      password: 'test',
    });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('Jason');
  });

  it('should respond with a user on POST /signin with basic auth header', async () => {
    let authString = base64.encode('Jason:test');
    const response = await request.post('/signin').set('Authorization', `Basic ${authString}`);

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('Jason');
  });

});