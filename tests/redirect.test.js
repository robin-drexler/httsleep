import { describe, it, expect } from "bun:test";

describe("redirecting to resources integration", () => {
  it("tells not to redirect when there is no redirectUrl in request", async () => {
    const response = await fetch("http://localhost:3000/0", {
      redirect: "manual",
    });
    expect(response.status).toEqual(200);
    expect(response.headers.get("location")).toEqual(null);
  });

  it("redirects to given resource if any", async () => {
    const redirectUrl =
      "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js";
    const response = await fetch(
      `http://localhost:3000/0?redirectUrl=${redirectUrl}`,
      { redirect: "manual" }
    );
    expect(response.status).toEqual(301);
    expect(response.headers.get("location")).toEqual(redirectUrl);
  });

  it("combines redirectUrl with referer to allow for relative urls to be passed as redirectUrl", async () => {
    const redirectUrl = "bar";
    const response = await fetch(
      `http://localhost:3000/0?redirectUrl=${redirectUrl}`,
      {
        redirect: "manual",
        headers: {
          referer: "http://google.com/foo/",
        },
      }
    );
    expect(response.status).toEqual(301);
    expect(response.headers.get("location")).toEqual(
      "http://google.com/foo/bar"
    );
  });

  it("returns redirectUrl if it is a complete url even if referer exists", async () => {
    const redirectUrl = "http://google.com/bar/";
    const response = await fetch(
      `http://localhost:3000/0?redirectUrl=${redirectUrl}`,
      {
        redirect: "manual",
        headers: {
          referer: "http://yahoo.com/foo/",
        },
      }
    );
    expect(response.status).toEqual(301);
    expect(response.headers.get("location")).toEqual(redirectUrl);
  });
});
