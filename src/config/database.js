const mongoose = require('mongoose'); // Import Mongoose
const User = require('../models/userModel'); // Import the User model (optional, can be omitted if not used here)

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string
    await mongoose.connect('mongodb://root:MjExODAteW9lMzJu@localhost:27017');
    console.log('MongoDB connected'); // Log successful connection
  } catch (error) {
    console.error('MongoDB connection error:', error); // Log connection error
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Export the connectDB function
