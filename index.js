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

app.all(
  '/:seconds',
  delayMiddleware,
  proxyMiddleware,
  redirectMiddleware,
  (req, res) => {
    res.send('OK!');
  }
);

app.get('/', (req, res) => {
  const html = `
  <html>
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        box-sizing: border-box;
        background: linear-gradient(312deg, rgba(153,218,255,1) 0%, rgba(0,128,128,1) 100%);
        color: white;
      }
      .wrapper {
        margin: 0 auto;
        max-width: 960px;
        padding: 1rem;
      }
      .example {
        font-family: monospace;
        font-size: 1.5rem;
        color: white;
      }
      section {
        border-bottom: 1px solid rgba(255,255,255, .2);
        margin-top: 1rem;
        padding-bottom: 1rem;
      }
      section:first-child {
        margin-top: 2rem;
      }
    </style>
    </head>
    <body>
      <div class="wrapper">
        <header>
          <h1>😴 httsleep 😴</h1>
          <h2>
          Delay HTTP requests to test how your app behaves when requests take longer than expected.
          </h2>
        </header>
        <main>
          <section>
            <h3>Proxy</h3>
            <div>
              <a class="example" href="https://httsleep.herokuapp.com/3/?proxyUrl=https://httpbin.org/headers">
              /:seconds/?proxyUrl=:proxyUrl
              </a>
            </div>
          </section>
           <section>
            <h3>Redirect</h3>
            <div>
              <a class="example" href="https://httsleep.herokuapp.com/3/?redirectUrl=https://httpbin.org/headers">
              /:seconds/?redirectUrl=:redirectUrl
              </a>
            </div>
          </section>
          <section>
            <h3>Delaying a 200 response</h3>
            <div>
              <a class="example" href="https://httsleep.herokuapp.com/3">
              /:seconds
              </a>
            </div>
          </section>
        </main>
      </div>

    </body>
  </html>
  `;
  res.send(html);
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
