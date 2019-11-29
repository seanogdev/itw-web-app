module.exports = {
  client: {
    service: {
      name: 'itw',
      // URL to the GraphQL API
      url: process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
};
