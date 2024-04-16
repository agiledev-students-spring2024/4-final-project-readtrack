const mongoose = require('mongoose');
const User = require('./src/models/User');
const Book = require('./src/models/Book');
const bcrypt = require("bcryptjs");
require('dotenv').config();

// MongoDB connection string
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB from populateDB.js!');
        populateDB();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const saltRounds = 10;
async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

// Save sample books to MongoDB
const saveBooks = async (books) => {
    await Book.deleteMany({});
    for (const book of books) {
        await book.save();
    }
};

// Save sample users to MongoDB
const saveUsers = async (users) => {
    await User.deleteMany({});
    for (const user of users) {
        await user.save();
    }
};

const populateDB = async () => {
    try {
        const hashedPasswordSample = await hashPassword('123');

        const books = [
            new Book({
                title: "The Secret Garden",
                author: "Frances Hodgson Burnett",
                description: "A ten-year-old orphan comes to live in a lonely house on the Yorkshire moors...",
                genres: ["Children's book", "Fiction"],
                publishedDate: "1911",
                coverUrl: "https://covers.openlibrary.org/b/OLID/OL37044748M-M.jpg"
            }),
            new Book({
                title: "1984",
                author: "George Orwell",
                description: "A dystopian social science fiction novel and cautionary tale...",
                genres: ["Dystopian", "Political fiction", "Social science fiction"],
                publishedDate: "1949",
                coverUrl: "https://covers.openlibrary.org/b/OLID/OL39803336M-M.jpg"
            }),
            new Book({
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                description: "A magical, living book, blended of irony, romance, and mysticism.",
                genres: ["Fiction", "Tragedy"],
                publishedDate: "1925",
                coverUrl: "https://covers.openlibrary.org/b/OLID/OL46773254M-M.jpg"
            }),
        ];
        await saveBooks(books);

        const users = [
            new User({
                fullname: "John Doe",
                username: "john_doe",
                email: "john.doe@example.com",
                password: hashedPasswordSample,
                books: {
                    currentlyReading: [books[0]._id],
                    finishedReading: [books[2]._id],
                    wishlist: [books[1]._id],
                    favorites: [books[0]._id, books[1]._id]
                }
            }),
            new User({
                fullname: "Jane Smith",
                username: "jane_smith",
                email: "jane.smith@example.com",
                password: hashedPasswordSample,
                books: {
                    currentlyReading: [books[2]._id],
                    finishedReading: [books[1]._id],
                    wishlist: [books[0]._id],
                    favorites: [books[1]._id]
                }
            })
        ];

        await saveUsers(users);
        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        setTimeout(() => {
            mongoose.connection.close()
                .then(() => {
                    console.log('Disconnected from MongoDB');
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Error disconnecting from MongoDB:', error);
                    process.exit(1);
                });
        }, 1000); // Delay the disconnection by 1 second (adjust as needed)
    }
};

module.exports = { populateDB };