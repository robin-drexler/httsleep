var request = require('request');

describe('error behavior', function() {

  it('responds with status code 400 when seconds is not a number', function(done) {
    request('http://localhost:3000/lol', function(error, response) {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });
})
