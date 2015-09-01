beforeAll(function(done) {
  app.close();
  app.start(done);
});

afterAll(function(done) {
  app.close(done);
});
