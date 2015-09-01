var app = require('../../index.js');

beforeAll(function(done) {
  app.close(function() {
    app.start(function() {
      console.log('STARTED')
      done();
    });
  });

});

afterAll(function(done) {
  app.close(done);
});
