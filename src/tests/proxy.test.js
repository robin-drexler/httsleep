import { describe, it, expect } from "bun:test";

describe("proxy", () => {
  it("proxies request", async () => {
    const proxyUrl = "https://httpbin.org/headers";
    const response = await fetch(
      `http://localhost:3000/0?proxyUrl=${proxyUrl}`
    );
    const parsed = await response.json();
    expect(response.status).toEqual(200);
    expect(parsed.headers.Host).toEqual("httpbin.org");
  });

  it("adds correct status code", async () => {
    const proxyUrl = "https://httpbin.org/status/418";
    const response = await fetch(
      `http://localhost:3000/0?proxyUrl=${proxyUrl}`
    );
    expect(response.status).toEqual(418);
  });
});
