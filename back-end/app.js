const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const { populateDB } = require('./populateDB');

// Import routes
const userRoutes = require('./src/api/routes/userRoutes');

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(error => console.error('MongoDB connection error:', error));

// Use routes
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path, req.body);
    next();
});

app.use('/api', userRoutes);

// Default route for testing the server
app.get('/', (req, res) => {
    res.send('Welcome to the Book API!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something broke!' });
});

// populateDB();

module.exports = app;