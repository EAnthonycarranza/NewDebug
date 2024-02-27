const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../api/models/User');

const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decodedToken); // Keep this line for debugging
  
      // Change here: Access the ID using decodedToken.data._id
      const userId = decodedToken.data._id; 
      console.log('User ID:', userId); // Add this to debug
  
      // Find the user by the decoded token's ID
      const user = await User.findById(userId);
      console.log('User fetched:', user); // Keep this line for debugging
  
      if (user && user.isAdmin) {
        // If the user exists and is an admin, proceed to the next middleware
        next();
      } else {
        // If the user is not an admin, return an error
        res.status(403).json({ message: 'Access denied. Admins only.' });
      }
    } catch (error) {
      console.log('Error in isAdmin middleware:', error); // Keep this line for debugging
      res.status(401).json({ message: 'Invalid request!' });
    }
  };  

module.exports = isAdmin;
