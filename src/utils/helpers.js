export function parseWpUrl(link) {
  try {
    return new URL(link).pathname;
  } catch {
    return null;
  }
}

export function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function truncate(str, wordCount = 15) {
  return str.split(' ').splice(0, wordCount).join(' ');
}
