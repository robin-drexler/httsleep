var express = require('express');
var app = express();
var redirect = require('./redirect');
var proxy = require('./proxy');
var server;

const delayMiddleware = require('./delayMiddleware');

const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.param('seconds', delayMiddleware);

app.all('/:seconds', function(req, res) {
  if (redirect.shouldRedirect(req)) {
    return res.redirect(301, redirect.getRedirectUrl(req));
  }

  if (proxy.shouldProxy(req)) {
    return proxy.proxy(req, res, proxy.getProxyUrl(req));
  }

  res.send('OK!');
});

exports.start = function(cb) {
  server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    if (cb) {
      cb();
    }
    console.log('Example app listening at http://%s:%s', host, port);
  });
};

exports.close = function(cb) {
  if (server) {
    server.close(cb);
  } else {
    cb();
  }
};

if (module.id === require.main.id) {
  exports.start();
}
