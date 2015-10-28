var request = require('request');
var redirect = require('../redirect');

describe('redirect module', function () {
  it('tells not to redirect when there is no redirectUrl in request', function() {
    var request = {
      query: {}
    };

    expect(redirect.shouldRedirect(request)).toEqual(false);
  });

  it('tells to redirect when there is a redirectUrl in request', function() {
    var request = {
      query: {
        redirectUrl: 'http://google.com'
      }
    };

    expect(redirect.shouldRedirect(request)).toEqual(true);
  });

  it('returns redirect url if any', function() {
    var request = {
      query: {
        redirectUrl: 'http://google.com'
      },
      headers: {}
    };

    expect(redirect.getRedirectUrl(request)).toEqual('http://google.com/');
  });

  it('combines redirectUrl with referer to allow for relative urls to be passed as redirectUrl', function() {
    var request = {
      query: {
        redirectUrl: 'bar'
      },
      headers: {
        'referer': 'http://google.com/foo/'
      }
    };

    expect(redirect.getRedirectUrl(request)).toEqual('http://google.com/foo/bar');
  });

  it('returns redirectUrl if it is a complete url even if referer exists', function() {
    var request = {
      query: {
        redirectUrl: 'http://google.com/bar/'
      },
      headers: {
        'referer': 'http://yahoo.com/foo/'
      }
    };

    expect(redirect.getRedirectUrl(request)).toEqual('http://google.com/bar/');
  });
});

describe('redirecting to resources integration', function() {
  it('redirects to given resource if any', function(done) {
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
