import { describe, it, expect } from "bun:test";
import { validateUrl } from "../utils/validateUrl.js";

describe("validateUrl", () => {
  it("accepts valid http URL", () => {
    const result = validateUrl("http://example.com");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("accepts valid https URL", () => {
    const result = validateUrl("https://example.com/path?query=1");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("rejects empty URL", () => {
    const result = validateUrl("");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("URL is required");
  });

  it("rejects null URL", () => {
    const result = validateUrl(null);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("URL is required");
  });

  it("rejects undefined URL", () => {
    const result = validateUrl(undefined);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("URL is required");
  });

  it("rejects invalid URL format", () => {
    const result = validateUrl("not-a-valid-url");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Invalid URL format");
  });

  it("rejects file:// protocol", () => {
    const result = validateUrl("file:///etc/passwd");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("URL must use http or https protocol");
  });

  it("rejects javascript: protocol", () => {
    const result = validateUrl("javascript:alert(1)");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("URL must use http or https protocol");
  });
});
