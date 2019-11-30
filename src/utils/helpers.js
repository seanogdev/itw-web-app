import { parseISO, format } from 'date-fns/esm';
import he from 'he';

export function decode(string) {
  return he.decode(string);
}

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

export const getFirstFocusable = (
  element,
  selectors = [
    'a[href]',
    '[contenteditable]',
    'input:not([disabled]):not([type=file])',
    'select:not([disabled])',
    'textarea:not([disabled])',
  ],
) => {
  const focusableElements = element.querySelectorAll(selectors.join(','));

  if (!focusableElements.length) {
    return false;
  }

  return focusableElements[0];
};

/**
 *
 * @param {HTMLElement} element
 * @param {Array} selectors
 */
export const focusFirstFocusable = (element, selectors) => {
  const firstFocusable = getFirstFocusable(element, selectors);

  if (firstFocusable) {
    // Needed for FF to show the cursor
    // if theres an overflow to the right
    firstFocusable.scrollLeft = 99999;
    firstFocusable.focus();
  }
};
