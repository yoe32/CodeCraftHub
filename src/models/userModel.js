const mongoose = require('mongoose'); // Import Mongoose library

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Username is required
    unique: true,   // Username must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
