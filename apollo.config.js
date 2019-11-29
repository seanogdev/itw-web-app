module.exports = {
  client: {
    service: {
      name: 'itw',
      // URL to the GraphQL API
      url: 'https://demo.wpgraphql.com/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
};
