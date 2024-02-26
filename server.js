const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connections');
const bodyParser = require('body-parser');
const userRoutes = require('./api/routes/UserRoutes');
const userController = require('./api/controllers/users'); 
const routes = require('./api/routes'); // Adjust the path as necessary
const personalInformationController = require('./api/controllers/personalInformation');
const router = require('./api/routes');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

app.post('/login', userController.login);
app.post('/adminlogin', userController.adminLogin);
app.post('/register', userController.register);

// Define routes for PersonalInformation
router.get('/personalInformation/:id', personalInformationController.getOne);
router.put('/personalInformation/:id', personalInformationController.update);
router.delete('/personalInformation/:id', personalInformationController.delete);
router.post('/personalInformation', personalInformationController.create);

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
