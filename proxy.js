const url = require('url');
const request = require('request');

module.exports = {
  shouldProxy: function(req) {
    return !!req.query.proxyUrl;
  },
  getProxyUrl: function(req) {
    return req.query.proxyUrl;
  },
  proxy: function(req, res, proxyUrl) {
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
        return res.send(response.body);
      }
    );
  }
};
