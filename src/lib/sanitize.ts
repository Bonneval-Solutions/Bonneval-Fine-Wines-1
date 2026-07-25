/** Strip HTML tags and encode the five dangerous HTML characters. */
export function sanitizeText(value: string, maxLength = 2000): string {
  return value
    .trim()
    .slice(0, maxLength)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Strict email: local@domain.tld, no spaces, no consecutive dots. */
export function isValidEmail(email: string): boolean {
  return (
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) &&
    !email.includes("..") &&
    email.length <= 254
  );
}

/**
 * Phone: optional field, but if supplied it MUST include a country code.
 * Accepts + followed by 7–15 digits (spaces, hyphens, parentheses stripped).
 */
export function isValidPhone(phone: string): boolean {
  const stripped = phone.replace(/[\s\-().]/g, "");
  return /^\+[1-9]\d{6,14}$/.test(stripped);
}

/** Normalise a phone string to digits-only after the leading +. */
export function normalisePhone(phone: string): string {
  const stripped = phone.replace(/[\s\-().]/g, "");
  return stripped.startsWith("+") ? stripped : `+${stripped}`;
}
