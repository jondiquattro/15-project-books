'use strict';

const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const {server} = require(`${rootDir}/src/server.js`);
const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('api server', () => {

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/api/v1/notes/12')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond properly on request to /api/v1/books', () => {

    return mockRequest
      .get('/api/v1/books')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

  it('should be able to post to /api/v1/books', () => {

    let obj = {name:'paper products', type: 'paper'};

    return mockRequest
      .post('/api/v1/books')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      });

  });

  it('should be able to post to /api/v1/books', ()  => {

    let obj = {name:'Towels', type:'paper',price:4};

    return mockRequest
      .post('/api/v1/books')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.team).toEqual(obj.team);
      });

  });


  it('following a post to books, should find a single record', () => {

    let obj = {name:'Towels', type:'paper',price:4};

    return mockRequest
      .post('/api/v1/books')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/books/${results.body._id}`)
          .then(list => {
            expect(list.status).toBe(200);
            expect(list.body.team).toEqual(obj.team);
          });
      });

  });

});
