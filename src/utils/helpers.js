import { parseISO, format } from 'date-fns/esm';

export function parseWpUrl(link) {
  try {
    return new URL(link).pathname;
  } catch {
    return null;
  }
}

export function generatePostUrl(post) {
  const iso = post.date ? post.date : new Date().toISOString();
  const date = parseISO(iso);
  const year = format(date, 'yyyy');
  const month = format(date, 'MM');
  return `/${year}/${month}/${post.slug}`;
}

export function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function truncate(str, wordCount = 15) {
  return str
    .split(' ')
    .splice(0, wordCount)
    .join(' ');
}

export const isProduction = process.env.NODE_ENV === 'production';
