// server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connections');
const bodyParser = require('body-parser');
const userController = require('./api/controllers/users');
const router = require('./api/routes');
const User = require('./api/models/User');
const app = express();

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => req.headers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startServer();
