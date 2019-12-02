import { generateFullName } from '@/utils/helpers';

export default {
  internalLink: (user) => `/author/${user.userId}`,
  fullName: (user) => generateFullName(user),
};
