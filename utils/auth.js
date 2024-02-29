const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

// Ensure the JWT_SECRET is defined in your .env file
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const expiration = '2h';

// Middleware to authenticate and attach user to request
const authenticate = (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length); // Extract the token from "Bearer <token>"
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error('Authentication error:', err.message);
        throw new AuthenticationError('Authentication token is invalid or expired');
      }
      req.user = decoded; // Attach the decoded user to the request
      next();
    });
  } else {
    throw new AuthenticationError('Authentication token must be provided');
  }
};

// Function to sign JWT tokens
const signToken = ({ email, username, _id }) => {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authenticate, signToken };
