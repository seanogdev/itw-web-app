import he from 'he';

export function decode(string) {
  return he.decode(string);
}

export function linkify(string) {
  // Regex source https://rubular.com/r/eGPe4bGlwMd98E
  const urlRegex = /(https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}([a-zA-Z0-9]|[/]))/g;
  return string.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

export function nl2br(string) {
  return `<p>${String(string)
    .trim() // trim trailing whitespace
    .replace(/\n/g, '<br />')}</p>`;
}

export function parseWpUrl(link) {
  try {
    return new URL(link).pathname;
  } catch {
    return null;
  }
}

export function generateFullName(user) {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.name;
}

export function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ? doc.body.textContent.replace(/^\n|\n$/g, '') : '';
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

export function findComments({ commentId, comments, onFound }) {
  const parent = comments.nodes;
  if (!commentId) {
    onFound(parent);
    return;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const node of parent) {
    if (node.commentId === commentId) {
      onFound(node.replies.nodes);
      return;
    }
    if (node.replies && node.replies.nodes.length) {
      findComments({
        commentId,
        comments: node.replies,
        onFound,
      });
    }
  }
}

export function findComment({ commentId, comments, onFound }) {
  const parent = comments.nodes;
  // eslint-disable-next-line no-restricted-syntax
  for (const node of parent) {
    if (node.commentId === commentId) {
      onFound(node);
      return;
    }
    if (node.replies && node.replies.nodes.length) {
      findComments({
        commentId,
        comments: node.replies,
        onFound,
      });
    }
  }
}
