// Import necessary modules
const User = require('../models/userModel'); // User model
const bcrypt = require('bcrypt'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for generating and verifying JWTs

// User registration handler
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' }); // Conflict: username taken
    }

    // Hash the password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // Save the new user to the database

    return res.status(201).json({ message: 'User registered successfully' }); // Success: user created
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};

// User login handler
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body

    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Unauthorized: invalid credentials
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Unauthorized: invalid credentials
    }

    // Generate a JWT for the user with a 1-hour expiration
    const token = jwt.sign({ username: existingUser.username }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({ token }); // Success: return the token
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};

// User profile update handler
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params; // Extract the current username from URL parameters
    const { newUsername } = req.body; // Extract the new username from request body

    // Update the user's username in the database
    await User.updateOne({ username }, { username: newUsername });

    return res.status(200).json({ message: 'User profile updated successfully' }); // Success: username updated
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};
