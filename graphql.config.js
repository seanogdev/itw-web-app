require('dotenv-flow').config();

module.exports = {
  schema: process.env.VUE_APP_GRAPHQL_ENDPOINT,
};
