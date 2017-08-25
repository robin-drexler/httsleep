const url = require('url');

const getRedirectUrl = req => {
  const referer = req.headers['referer'] || '';
  return url.resolve(referer, req.query.redirectUrl);
};

module.exports = (req, res, next) => {
  const redirectUrl = req.query.redirectUrl;

  if (!redirectUrl) {
    return next();
  }

  return res.redirect(301, getRedirectUrl(req));
};
