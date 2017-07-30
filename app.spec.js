const request = require('request');

const app = require('./app.js');
const base_url = 'http://localhost:3000/';

describe('Employee API', () => {

  it('should get 200 response', (done) => {
    request.get(base_url, (error, response, body) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('should respond with hello world', (done) => {
    request.get(base_url, (error, response, body) => {
      expect(body).toBe('Hello World!');
      app.closeServer();
      done();
    });
  });

});
