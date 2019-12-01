import { parseISO, format } from 'date-fns/esm';

export default {
  internalLink: (post) => {
    const iso = post.date ? post.date : new Date().toISOString();
    const date = parseISO(iso);
    const year = format(date, 'yyyy');
    const month = format(date, 'MM');
    return `/${year}/${month}/${post.slug}`;
  },
};
