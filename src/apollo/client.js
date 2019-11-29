import ApolloClient from 'apollo-boost';

console.log(process.env.VUE_APP_GRAPHQL_ENDPOINT);
const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
});

export default apolloClient;
