export function parseWpUrl(link) {
  try {
    return new URL(link).pathname;
  } catch {
    return null;
  }
}
