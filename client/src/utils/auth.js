import { gql } from '@apollo/client';
import { LOGIN_USER } from './mutations'; // Assuming mutations are exported from mutations.js

// Decode JWT Token to extract user information
const decodeToken = (token) => {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    }
    return null;
  };

// Save token to localStorage and set headers for future requests
export const login = (token) => {
  localStorage.setItem('token', token);
};

// Retrieve the token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Logout by removing the token from localStorage
export const logout = () => {
  localStorage.removeItem('token');
};

// Get user ID from the token
export const getUserIdFromToken = () => {
    const token = getToken();
    const decoded = decodeToken(token);
    return decoded ? decoded._id : null;
  };

