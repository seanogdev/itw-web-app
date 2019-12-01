import { generateFullName } from '@/utils/helpers';

export default {
  internalLink: (user) => `/author/${user.nicename}`,
  fullName: (user) => generateFullName(user),
};
