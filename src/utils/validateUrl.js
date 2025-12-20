/**
 * Validates that a URL is a valid absolute URL with http or https protocol.
 * @param {string} url - The URL to validate
 * @returns {{ valid: boolean, error?: string }} - Validation result
 */
export function validateUrl(url) {
  if (!url) {
    return { valid: false, error: "URL is required" };
  }

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return {
        valid: false,
        error: "URL must use http or https protocol",
      };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}
