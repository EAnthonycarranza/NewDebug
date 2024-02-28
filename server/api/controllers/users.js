const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { signToken } = require('../../utils/auth');

// Handle user login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error('User not found');
    }    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User matched, generate a token
    const token = signToken({ email: user.email, username: user.username, _id: user._id });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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

    console.log('Admin Login successful'); // Add this log

    // Add isAdmin field to the user object
    user.isAdmin = true;

    const token = signToken(user);
    res.json({ token, user }); // Send the modified user object with isAdmin field
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

    const newUser = new User({
      username,
      email,
      password,
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


