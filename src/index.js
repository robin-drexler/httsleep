import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import delayMiddleware from "./middleware/delayMiddleware.js";
import proxyMiddleware from "./middleware/proxyMiddleware.js";
import redirectMiddleware from "./middleware/redirectMiddleware.js";
import corsMiddleware from "./middleware/corsMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
let server;

const port = process.env.PORT || 3000;

app.use(corsMiddleware);

app.all(
  "/:seconds",
  delayMiddleware,
  proxyMiddleware,
  redirectMiddleware,
  (req, res) => {
    res.send("OK!");
  }
);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

export const start = (cb) => {
  server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    if (cb) {
      cb();
    }
    console.log("Example app listening at http://%s:%s", host, port);
  });
};

export const close = (cb) => {
  if (server) {
    server.close(cb);
  } else {
    cb();
  }
};

if (import.meta.main) {
  start();
}

export default app;
