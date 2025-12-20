import { beforeAll, afterAll } from "bun:test";
import { start, close } from "../../index.js";

beforeAll(async () => {
  await new Promise((resolve) => {
    close(() => {
      start(() => {
        console.log("STARTED");
        resolve();
      });
    });
  });
});

afterAll(async () => {
  await new Promise((resolve) => {
    close(resolve);
  });
});
