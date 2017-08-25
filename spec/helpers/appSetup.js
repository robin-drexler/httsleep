const app = require('../../index.js');

beforeAll(done => {
  app.close(() => {
    app.start(() => {
      console.log('STARTED');
      done();
    });
  });
});

afterAll(done => {
  app.close(done);
});
