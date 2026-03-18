/**
 * Security utilities for input validation and sanitization.
 */

/** Escape HTML special characters to prevent XSS in email templates. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Validate that a string is a plausible email address. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

/** Validate that a string is a safe HTTP(S) URL. */
export function isValidHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Ensure a value is a non-empty string within a max length. */
export function isNonEmptyString(
  value: unknown,
  maxLength = 5000
): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}
