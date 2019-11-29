import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
});

// Cache implementation
const cache = new InMemoryCache({ fragmentMatcher });

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
export default apolloClient;
