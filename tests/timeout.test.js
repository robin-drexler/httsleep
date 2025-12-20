import { describe, it, expect } from "bun:test";

describe("timeout", () => {
  it("waits until it responds", async () => {
    const start = Date.now();
    const response = await fetch("http://localhost:3000/1");
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThan(999);
  });
});
