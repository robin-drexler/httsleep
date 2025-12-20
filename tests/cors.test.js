import { describe, it, expect } from "bun:test";

describe("CORS", () => {
  it("returns the requesting origin in Access-Control-Allow-Origin header", async () => {
    const origin = "https://example.com";
    const response = await fetch("http://localhost:3000/0", {
      headers: { Origin: origin },
    });
    expect(response.headers.get("Access-Control-Allow-Origin")).toEqual(origin);
  });

  it("returns * when no Origin header is provided", async () => {
    const response = await fetch("http://localhost:3000/0");
    expect(response.headers.get("Access-Control-Allow-Origin")).toEqual("*");
  });

  it("returns Access-Control-Allow-Credentials header", async () => {
    const response = await fetch("http://localhost:3000/0", {
      headers: { Origin: "https://example.com" },
    });
    expect(response.headers.get("Access-Control-Allow-Credentials")).toEqual(
      "true"
    );
  });

  it("returns Access-Control-Allow-Methods header with all methods", async () => {
    const response = await fetch("http://localhost:3000/0", {
      headers: { Origin: "https://example.com" },
    });
    const methods = response.headers.get("Access-Control-Allow-Methods");
    expect(methods).toContain("GET");
    expect(methods).toContain("POST");
    expect(methods).toContain("PUT");
    expect(methods).toContain("PATCH");
    expect(methods).toContain("DELETE");
    expect(methods).toContain("OPTIONS");
  });

  describe("preflight requests", () => {
    it("responds to OPTIONS preflight with 204 status", async () => {
      const response = await fetch("http://localhost:3000/0", {
        method: "OPTIONS",
        headers: { Origin: "https://example.com" },
      });
      expect(response.status).toEqual(204);
    });

    it("reflects requested headers in Access-Control-Allow-Headers", async () => {
      const requestedHeaders = "X-Custom-Header, X-Another-Header";
      const response = await fetch("http://localhost:3000/0", {
        method: "OPTIONS",
        headers: {
          Origin: "https://example.com",
          "Access-Control-Request-Headers": requestedHeaders,
        },
      });
      expect(response.headers.get("Access-Control-Allow-Headers")).toEqual(
        requestedHeaders
      );
    });
  });
});
