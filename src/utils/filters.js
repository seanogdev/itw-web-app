import formatDateFn from 'date-fns/format';
import { parseISO } from 'date-fns/esm';
import { stripHtml, truncate } from '@/utils/helpers';

/**
 * @param {Date} date
 */
function formatDate(date, format = 'MMMM d, yyyy') {
  return formatDateFn(parseISO(date), format);
}

export default {
  formatDate,
  stripHtml,
  truncate,
};
