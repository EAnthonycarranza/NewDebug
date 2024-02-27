import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/api';
import { AuthProvider } from './utils/auth'; // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your App component with AuthProvider */}
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
