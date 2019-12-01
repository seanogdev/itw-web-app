import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import introspectionQueryResultData from './fragmentTypes.json';

const uri = process.env.VUE_APP_GRAPHQL_ENDPOINT;
const credentials = process.env.VUE_APP_REQUIRE_AUTH ? 'include' : null;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// HTTP connection to the API
const link = createHttpLink({
  uri,
  credentials,
});

// Cache implementation
const cache = new InMemoryCache({ fragmentMatcher });

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

export default apolloClient;
