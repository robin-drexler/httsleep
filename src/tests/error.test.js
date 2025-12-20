import { describe, it, expect } from "bun:test";

describe("error behavior", () => {
  it("responds with status code 400 when seconds is not a number", async () => {
    const response = await fetch("http://localhost:3000/lol");
    expect(response.status).toEqual(400);
  });

  it("responds with status code 400 when seconds is greater than 2 minutes (120 seconds)", async () => {
    const response = await fetch("http://localhost:3000/121");
    expect(response.status).toEqual(400);
  });
});
