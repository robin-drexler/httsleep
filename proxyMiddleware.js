const url = require('url');
const request = require('request');

module.exports = (req, res, next) => {
  const proxyUrl = req.query.proxyUrl;

  if (!proxyUrl) {
    return next();
  }

  req.url = proxyUrl;
  const host = url.parse(proxyUrl).host;
  const headers = Object.assign({}, req.headers, { host });

  request(
    {
      url: proxyUrl,
      headers
    },
    (e, response) => {
      if (e) {
        return res.send();
      }
      res.set(response.headers);
      return res.status(response.statusCode).send(response.body);
    }
  );
};
