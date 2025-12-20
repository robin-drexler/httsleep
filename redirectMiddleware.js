const getRedirectUrl = (req) => {
  const referer = req.headers["referer"] || "";
  const redirectUrl = req.query.redirectUrl;

  // If redirectUrl is already absolute, return it
  try {
    new URL(redirectUrl);
    return redirectUrl;
  } catch {
    // It's a relative URL, resolve against referer
    if (referer) {
      return new URL(redirectUrl, referer).href;
    }
    return redirectUrl;
  }
};

export default (req, res, next) => {
  const redirectUrl = req.query.redirectUrl;

  if (!redirectUrl) {
    return next();
  }

  return res.redirect(301, getRedirectUrl(req));
};
