var express = require('express');
var app = express();
var server;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:seconds', function (req, res) {
  var seconds = parseFloat(req.params.seconds);

  if (isNaN(seconds)) {
    res.status(400)
    .send('<strong>' + req.params.seconds + '</strong>' + 'are no valid seconds. Try something like <strong>3</strong>');
    return;
  }

  setTimeout(function() {
    res.send('OK!');
  }, seconds * 1000);
});


exports.start = function(cb) {
  server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    if (cb) {
      cb();
    }
    console.log('Example app listening at http://%s:%s', host, port);
  });
}

exports.close = function(cb) {
  if (server) {
    server.close(cb);
  } else {
    cb();
  }
}

if (module.id === require.main.id) {
  exports.start()
}
