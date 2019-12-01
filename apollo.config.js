require('dotenv-flow').config();

module.exports = {
  client: {
    service: {
      name: 'In The Works',
      // URL to the GraphQL API
      url: process.env.VUE_APP_GRAPHQL_ENDPOINT,
    },
    // Files processed by the extension
    includes: ['./src/**/*.*'],
  },
};
