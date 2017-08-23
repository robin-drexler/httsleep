var request = require('request');

describe('proxy', function() {
  it('proxies request', function(done) {
    const proxyUrl = 'https://httpbin.org/headers';

    request(`http://localhost:3000/0?proxyUrl=${proxyUrl}`, function(
      error,
      response
    ) {
      const parsed = JSON.parse(response.body);
      expect(response.statusCode).toEqual(200);
      expect(parsed.headers.Host).toEqual('httpbin.org');
      done();
    });
  });
});
