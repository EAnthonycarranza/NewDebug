const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { signToken } = require('../../utils/auth');

// Handle user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, isAdmin: true });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials or not an admin' });
    }

    const token = signToken(user);
    res.json({ token, user: { id: user.id, email: user.email, username: user.username, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: 'user'
      });
  
      await newUser.save();
  
      // Generate token
      const token = signToken(newUser);
      res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, username: newUser.username } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
