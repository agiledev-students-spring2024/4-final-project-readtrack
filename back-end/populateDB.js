const mongoose = require('mongoose');
const User = require('./src/models/User'); // Update path if necessary
const Book = require('./src/models/Book'); // Update path if necessary
require('dotenv').config();

// MongoDB connection string
mongoose.connect(process.env.URI);

const books = [
    new Book({
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        description: "A ten-year-old orphan comes to live in a lonely house on the Yorkshire moors...",
        genres: ["Children's book", "Fiction"],
        publishedDate: "1911",
        coverUrl: "https://example.com/secret-garden.jpg"
    }),
    new Book({
        title: "1984",
        author: "George Orwell",
        description: "A dystopian social science fiction novel and cautionary tale...",
        genres: ["Dystopian", "Political fiction", "Social science fiction"],
        publishedDate: "1949",
        coverUrl: "https://example.com/1984.jpg"
    })
];

const users = [
    new User({
        fullname: "John Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        password: "securepassword123", // Consider hashing passwords before saving
        books: {
            currentlyReading: [books[0]._id],
            finishedReading: [],
            wishlist: [books[1]._id],
            favorites: [books[0]._id, books[1]._id]
        }
    }),
    new User({
        fullname: "Jane Smith",
        username: "jane_smith",
        email: "jane.smith@example.com",
        password: "anothersecurepassword456", // Consider hashing passwords before saving
        books: {
            currentlyReading: [],
            finishedReading: [books[1]._id],
            wishlist: [books[0]._id],
            favorites: [books[1]._id]
        }
    })
];

// Save sample books to MongoDB
const saveBooks = async () => {
    await Book.deleteMany({}); // Optional: clear the collection first
    for (const book of books) {
        await book.save();
    }
    console.log('Books saved!');
};

// Save sample users to MongoDB
const saveUsers = async () => {
    await User.deleteMany({}); // Optional: clear the collection first
    for (const user of users) {
        await user.save();
    }
    console.log('Users saved!');
};

const populateDB = async () => {
    await saveBooks();
    await saveUsers();
    mongoose.disconnect();
};

populateDB();
