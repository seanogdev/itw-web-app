import formatDateFn from 'date-fns/format';
import { parseISO } from 'date-fns/esm';

/**
 * @param {Date} date
 */
function formatDate(date, format = 'MMMM d, yyyy') {
  return formatDateFn(parseISO(date), format);
}

export default {
  formatDate,
};
