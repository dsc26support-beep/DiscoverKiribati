/**
 * Validates that a string is a safe, well-formed http(s) URL before it is
 * ever used as a link target. Returns null for anything else (javascript:,
 * data:, malformed strings, etc.) so callers can simply skip rendering the
 * link rather than risk an unsafe href.
 */
export function safeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}
