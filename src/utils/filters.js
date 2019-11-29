
import { parseISO, format } from 'date-fns/esm';
import { stripHtml, truncate } from '@/utils/helpers';

/**
 * @param {Date} date
 */
function formatDate(date, formatString = 'MMMM d, yyyy') {
  if (!date) { return null; }
  return format(parseISO(date), formatString);
}

export default {
  formatDate,
  stripHtml,
  truncate,
};
