// server/utils/isAdmin.js

const isAdmin = (req, res, next) => {
    // Check if user is authenticated and isAdmin is true
    if (req.user && req.user.isAdmin === true) {
      // User is admin, proceed to next middleware or route handler
      next();
    } else {
      // User is not authorized, send 403 Forbidden response
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };
  
module.exports = isAdmin;
