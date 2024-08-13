const express = require('express'); // Import Express
const connectDB = require('./config/database'); // Import the database connection function
const userRoutes = require('./routes/userRoutes'); // Import user-related routes

const app = express(); // Create an Express application

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/users', userRoutes);

// Start the server
const port = 3000; // Define the port number
app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Log that the server has started
});
