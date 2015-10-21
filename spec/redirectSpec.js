var request = require('request');

describe('redirecting to resources', function() {

  it('it redirects to given resource if any', function(done) {
    redirectUrl = 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js'
    request({
        url: 'http://localhost:3000/0?redirectUrl=' + redirectUrl,
        followRedirect: false
      }, function(error, response) {

      expect(response.statusCode).toEqual(301);
      expect(response.headers['location']).toEqual(redirectUrl);

      done();
    });
  });
})
