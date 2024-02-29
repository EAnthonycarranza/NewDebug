// src/utils/api.js or wherever your ApolloClient is configured
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    console.log("Client-Side Token:", token); // Log the token found in local storage
    // Construct the authorization header
    const authHeader = token ? `Bearer ${token}` : "";
    console.log("Authorization Header:", authHeader); // Log the complete Authorization header
    return {
      headers: {
        ...headers,
        authorization: authHeader,
      },
    };
  });
  

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
