const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const userRoutes = require('./src/api/routes/userRoutes'); // Adjust the path as necessary

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(error => console.error('MongoDB connection error:', error));

// Use routes
app.use('/', userRoutes); // This will handle all user and user book routes

// Default route for testing the server
app.get('/', (req, res) => {
    res.send('Welcome to the Book API!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something broke!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
