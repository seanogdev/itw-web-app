import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://demo.wpgraphql.com/graphql',
});

export default apolloClient;
