import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql',
});

export default apolloClient;
