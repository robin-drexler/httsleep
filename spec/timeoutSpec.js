var request = require('request');

describe('timeout', function() {

  it('waits until it responds', function(done) {
    var start = new Date();
    request('http://localhost:3000/1', function(error, response) {
      var duration = new Date() - start;
      expect(duration).toBeGreaterThan(999);
      done();
    });
  });
})
