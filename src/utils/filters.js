import { parseISO, format } from 'date-fns/esm';
import { stripHtml, truncate, decode } from '@/utils/helpers';

/**
 * @param {Date} date
 */
function formatDate(date, formatString = 'MMMM d, yyyy') {
  if (!date) {
    return null;
  }
  return format(parseISO(date), formatString);
}

export default {
  decode,
  formatDate,
  stripHtml,
  truncate,
};
