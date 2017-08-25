const request = require('request');

describe('error behavior', () => {
  it('responds with status code 400 when seconds is not a number', done => {
    request('http://localhost:3000/lol', (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('responds with status code 400 when seconds is greater than 2 minutes (120 seconds)', done => {
    request('http://localhost:3000/121', (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });
});
