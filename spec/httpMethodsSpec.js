const request = require('request');

describe('http methods', () => {
  it('it responds to get requests', done => {
    request('http://localhost:3000/0', (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('it responds to post requests', done => {
    request.post('http://localhost:3000/0', (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});
