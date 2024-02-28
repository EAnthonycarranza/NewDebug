import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define your HttpLink
const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

// Ensure this authLink setup is correctly applied in your Apollo Client setup
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });  

// Define the debugLink for logging
const debugLink = new ApolloLink((operation, forward) => {
  console.log(`[GraphQL Request]: ${operation.operationName}`, operation.getContext().headers);
  return forward(operation);
});

// Combine the links and create the ApolloClient instance
const client = new ApolloClient({
  link: ApolloLink.from([authLink, debugLink, httpLink]), // Order matters here
  cache: new InMemoryCache(),
});

export default client;
