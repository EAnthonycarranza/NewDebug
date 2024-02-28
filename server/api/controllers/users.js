const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken'); // Make sure to import jwt if you're using it for token generation

// Assuming your signToken function looks something like this:
const signToken = (user) => {
  return jwt.sign(
    { 
      email: user.email, 
      username: user.username, 
      _id: user._id 
    },
    process.env.JWT_SECRET, // Ensure you have your JWT_SECRET in your .env file
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

// Handle user login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log(`Attempting login with:`, { email }); // Log without password for security

  try {
    const user = await User.findOne({ email: email.toLowerCase() }); // Ensure email is case-insensitive
    if (!user) {
      console.log('Login attempt failed: User not found');
      return res.status(401).json({ message: 'User not found or invalid credentials' });
    }

    // Compare provided password with hashed password in database
    const isValid = await bcrypt.compare(password, user.password);
    console.log(`Password comparison result: ${isValid}`);

    if (!isValid) {
      console.log(`Logging in with email: ${email} and password: ${password}`);
      console.log(`Hashed password in DB for comparison: ${user.password}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If password matches, generate token
    const token = signToken(user);
    console.log('Login successful, token generated');

    // Send back token and user info
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username 
      } 
    });
  } catch (error) {
    console.error('Login attempt error:', error);
    res.status(500).json({ message: 'Server error during login attempt' });
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
  console.log(`Registering user:`, { username, email }); // Log without password for security
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = signToken(newUser);
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


