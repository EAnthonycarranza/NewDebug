const { User } = require('../api/models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    // Add more queries as needed
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },

    register: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    adminLogin: async (_, { email, password }) => {
      const user = await User.findOne({ email, isAdmin: true });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
