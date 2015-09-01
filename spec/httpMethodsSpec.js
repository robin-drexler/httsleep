var request = require('request');

describe('http methods', function() {

  it('it responds to get requests', function(done) {
    request('http://localhost:3000/0', function(error, response) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('it responds to post requests', function(done) {
    request.post('http://localhost:3000/0', function(error, response) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
})
