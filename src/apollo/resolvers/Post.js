import { parseWpUrl } from '@/utils/helpers';

export default {
  internalLink: (post) => parseWpUrl(post.link),
};
