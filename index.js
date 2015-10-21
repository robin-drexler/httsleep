var express = require('express');
var app = express();
var server;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('/:seconds', function (req, res) {
  var MAX_SECONDS_DELAY = 120;
  var seconds = parseFloat(req.params.seconds);
  var redirectUrl = req.query.redirectUrl

  if (isNaN(seconds)) {
    res.status(400)
    .send('<strong>' + req.params.seconds + '</strong>' + 'are no valid seconds. Try something like <strong>3</strong>');
    return;
  }

  if (seconds > MAX_SECONDS_DELAY) {
    res.status(400)
    .send('<strong>' + req.params.seconds + '</strong>' + 'is too long. Try something like <strong>' + MAX_SECONDS_DELAY + '</strong>');
    return;
  }


  setTimeout(function() {
    if (redirectUrl) {
      return res.redirect(301, redirectUrl);
    }

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
