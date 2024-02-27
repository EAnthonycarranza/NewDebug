// client/src/utils/api.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

// Replace 'YOUR_GRAPHQL_API_URI' with your GraphQL endpoint
const API_URI = 'http://localhost:4000/graphqll';

const client = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache(),
});

export default client;
