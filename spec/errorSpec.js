var request = require('request');

describe('error behavior', function() {

  it('responds with status code 400 when seconds is not a number', function(done) {
    request('http://localhost:3000/lol', function(error, response) {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('responds with status code 400 when seconds is greater than 2 minutes (120 seconds)', function(done) {
    request('http://localhost:3000/121', function(error, response) {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });
})
