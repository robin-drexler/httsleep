const request = require('request');

describe('timeout', () => {
  it('waits until it responds', done => {
    const start = new Date();
    request('http://localhost:3000/1', (error, response) => {
      const duration = new Date() - start;
      expect(duration).toBeGreaterThan(999);
      done();
    });
  });
});
