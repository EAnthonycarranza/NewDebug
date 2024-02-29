// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connections');
const bodyParser = require('body-parser');
const userController = require('./api/controllers/users');
const router = require('./api/routes');
const User = require('./api/models/User');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Function to sign tokens
const signToken = (user) => {
    return jwt.sign(
      { email: user.email, username: user.username, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
  };
  
  // Function to automatically register and login a hardcoded user
  const autoRegisterAndLogin = async () => {
    const hardcodedUser = {
      username: "autoUser",
      email: "auto@example.com",
      password: "autoPassword123",
    };
  
    console.log("Attempting auto-registration and auto-login...");
  
    // Attempt to find the user first to avoid duplicating
    let user = await User.findOne({ email: hardcodedUser.email });
    if (!user) {
      // Hash password
      const hashedPassword = await bcrypt.hash(hardcodedUser.password, 12);
      // Create new user
      user = new User({
        username: hardcodedUser.username,
        email: hardcodedUser.email,
        password: hardcodedUser.password,
    });
      await user.save();
      console.log("Auto-registered user:", user);
    } else {
      console.log("User already exists, proceeding to auto-login");
    }
  
    // Auto-login
    const isValid = await bcrypt.compare(hardcodedUser.password, user.password);
    if (isValid) {
      console.log("Auto-login successful for:", user.email);
    } else {
      console.error("Auto-login failed due to password mismatch. Check password hashing and comparison.");
    }
  };

const app = express();

app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log incoming requests
app.use((req, _, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length); // Skip 'Bearer '
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        console.error('Token verification error:', error.message);
      }
    }
    next();
  });
  

// Apply the router to your Express application
app.use('/api', router);

// Initialize admin user
async function initializeAdminUser() {
    try {
      const adminEmail = 'admin@example.com';
      let adminUser = await User.findOne({ email: adminEmail });
      
      if (!adminUser) {
        // Admin user doesn't exist, so create one
        adminUser = new User({
          username: 'admin',
          email: 'admin@example.com',
          password: 'password',
          isAdmin: true, // Assuming your User model has a role field
          // Include any other fields your User model requires
        });
  
        await adminUser.save();
        console.log('Admin user created');
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Error initializing admin user:', error);
    }
  }
  
  // Call the initializeAdminUser function
  initializeAdminUser();

  const startServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
          // Here, you're assuming req.user is already populated by your Express middleware
          // Make sure the token verification middleware runs before ApolloServer middleware
          return { user: req.user };
        },
      debug: true,
      formatError: (error) => {
        console.error('GraphQL error:', error);
        return error;
      },
      formatResponse: (response) => {
        console.log('GraphQL response:', response);
        return response;
      },
    });
  
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 3001;
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        autoRegisterAndLogin();
      });
    });
  };
  
startServer();
