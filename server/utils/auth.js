const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET; 
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user', {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  }),
  authenticate: function (req, res, next) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // Check if token exists in headers
    if (req.headers.authorization) {
      // Extract token from the "Authorization" header
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      // No token provided, return authentication error
      return res.status(401).json({ message: 'Authentication required' });
    }
    // Verify token and add user data to request object
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch (error) {
      console.log('Invalid token:', error.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
