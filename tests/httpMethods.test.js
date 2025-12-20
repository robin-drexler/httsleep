import { describe, it, expect } from "bun:test";

describe("http methods", () => {
  it("responds to get requests", async () => {
    const response = await fetch("http://localhost:3000/0");
    expect(response.status).toEqual(200);
  });

  it("responds to post requests", async () => {
    const response = await fetch("http://localhost:3000/0", { method: "POST" });
    expect(response.status).toEqual(200);
  });
});
