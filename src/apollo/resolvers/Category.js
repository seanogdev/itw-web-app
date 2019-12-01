import { parseWpUrl } from '@/utils/helpers';

export default {
  internalLink: (category) => parseWpUrl(category.link),
};
