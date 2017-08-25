const request = require('request');

describe('redirecting to resources integration', () => {
  it('tells not to redirect when there is no redirectUrl in request', function(
    done
  ) {
    request(
      {
        url: 'http://localhost:3000/0',
        followRedirect: false
      },
      (error, response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers['location']).toEqual(undefined);

        done();
      }
    );
  });
  it('redirects to given resource if any', done => {
    redirectUrl =
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js';
    request(
      {
        url: 'http://localhost:3000/0?redirectUrl=' + redirectUrl,
        followRedirect: false
      },
      (error, response) => {
        expect(response.statusCode).toEqual(301);
        expect(response.headers['location']).toEqual(redirectUrl);

        done();
      }
    );
  });

  it('combines redirectUrl with referer to allow for relative urls to be passed as redirectUrl', function(
    done
  ) {
    redirectUrl = 'bar';
    request(
      {
        url: 'http://localhost:3000/0?redirectUrl=' + redirectUrl,
        followRedirect: false,
        headers: {
          referer: 'http://google.com/foo/'
        }
      },
      (error, response) => {
        expect(response.statusCode).toEqual(301);
        expect(response.headers['location']).toEqual(
          'http://google.com/foo/bar'
        );

        done();
      }
    );
  });
  it('returns redirectUrl if it is a complete url even if referer exists', function(
    done
  ) {
    const redirectUrl = 'http://google.com/bar/';
    request(
      {
        url: 'http://localhost:3000/0?redirectUrl=' + redirectUrl,
        followRedirect: false,
        headers: {
          referer: 'http://yahoo.com/foo/'
        }
      },
      (error, response) => {
        expect(response.statusCode).toEqual(301);
        expect(response.headers['location']).toEqual(redirectUrl);

        done();
      }
    );
  });
});
