const express = require('express');
const app = express();
let server;

const delayMiddleware = require('./delayMiddleware');
const proxyMiddleware = require('./proxyMiddleware');
const redirectMiddleware = require('./redirectMiddleware');

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.param('seconds', delayMiddleware);
app.use(proxyMiddleware);
app.use(redirectMiddleware);

app.all('/:seconds', (req, res) => {
  res.send('OK!');
});

exports.start = cb => {
  server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    if (cb) {
      cb();
    }
    console.log('Example app listening at http://%s:%s', host, port);
  });
};

exports.close = cb => {
  if (server) {
    server.close(cb);
  } else {
    cb();
  }
};

if (module.id === require.main.id) {
  exports.start();
}
