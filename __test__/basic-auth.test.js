'use strict';

require('@code-fellows/supergoose');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);


// describe('testing server auth', () => {
//   it('should POST to /signin to login as a user (use basic auth)', async () => {
//     const response = await request.post('/signin');

//     expect(response.status).toEqual(200);
//   });
// });