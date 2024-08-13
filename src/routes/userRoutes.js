const express = require('express'); // Import Express
const router = express.Router(); // Create a new router instance
const userController = require('../controllers/userController'); // Import the user controller

// Define the user registration route
router.post('/register', userController.registerUser);

// Define the user login route
router.post('/login', userController.loginUser);

// Define the user profile update route
router.put('/:username', userController.updateUserProfile);

module.exports = router; // Export the router
