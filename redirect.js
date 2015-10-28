var url = require('url');
module.exports = {
  shouldRedirect: function(request) {
    return !!request.query.redirectUrl;
  },
  getRedirectUrl: function(request) {
    var referer = request.headers['referer'] || '';
    return url.resolve(referer, request.query.redirectUrl);
  }
};