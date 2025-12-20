export default function corsMiddleware(req, res, next) {
  const origin = req.get("Origin") || "*";

  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );

  // Reflect the requested headers back, allowing any headers
  const requestedHeaders = req.get("Access-Control-Request-Headers");
  if (requestedHeaders) {
    res.header("Access-Control-Allow-Headers", requestedHeaders);
  } else {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }

  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
}
