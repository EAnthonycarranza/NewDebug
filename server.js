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
const { authenticate, signToken } = require('./utils/auth');
  
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
app.use(authenticate);
  

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
        console.log("Headers:", req.headers); // Log incoming request headers
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
        console.log("Extracted Token:", token); // Log the extracted token
        let user = null;
  
        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = decoded;
            console.log("Decoded User:", user); // Log the decoded user info
          } catch (err) {
            console.error("Token Verification Error:", err);
            throw new AuthenticationError("You must be logged in.");
          }
        } else {
          console.log("No Token Found");
        }
  
        return { user };
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
