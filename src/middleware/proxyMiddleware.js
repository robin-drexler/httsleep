export default async (req, res, next) => {
  const proxyUrl = req.query.proxyUrl;

  if (!proxyUrl) {
    return next();
  }

  req.url = proxyUrl;
  const host = new URL(proxyUrl).host;
  const headers = { ...req.headers, host };
  delete headers["content-length"];

  try {
    const response = await fetch(proxyUrl, { headers });
    const body = await response.arrayBuffer();

    response.headers.forEach((value, key) => {
      res.set(key, value);
    });

    return res.status(response.status).send(Buffer.from(body));
  } catch (e) {
    return res.send();
  }
};
