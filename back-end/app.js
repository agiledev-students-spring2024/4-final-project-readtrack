const { default: axios } = require("axios");
const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());
const mockUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com', books: ['The Great Gatsby', 'To Kill a Mockingbird'], profile: 'avatar1.png' },
  { id: 2, username: 'user2', email: 'user2@example.com', books: ['1984', 'Brave New World'], profile: 'avatar2.png' },
  { id: 3, username: 'user3', email: 'user3@example.com', books: ['The Catcher in the Rye', 'The Grapes of Wrath'], profile: 'avatar3.png' },
  { id: 4, username: 'user4', email: 'user4@example.com', books: ['The Great Gatsby', '1984'], profile: 'avatar4.png' }
  
];
const books = [
  { id: 1, title: 'The Secret Garden', coverUrl: 'https://example.com/covers/secret-garden.jpg' },
  { id: 2, title: 'The Adventures of Sherlock Holmes', coverUrl: 'https://example.com/covers/sherlock-holmes.jpg' },
  { id: 3, title: 'Pride and Prejudice', coverUrl: 'https://example.com/covers/pride-prejudice.jpg' },
  { id: 4, title: 'Moby-Dick', coverUrl: 'https://example.com/covers/moby-dick.jpg' },
  { id: 5, title: 'To Kill a Mockingbird', coverUrl: 'https://example.com/covers/to-kill-a-mockingbird.jpg' },
  { id: 6, title: 'The Great Gatsby', coverUrl: 'https://example.com/covers/great-gatsby.jpg' },
  { id: 7, title: '1984', coverUrl: 'https://example.com/covers/1984.jpg' },
  { id: 8, title: 'Brave New World', coverUrl: 'https://example.com/covers/brave-new-world.jpg' },
  { id: 9, title: 'The Catcher in the Rye', coverUrl: 'https://example.com/covers/catcher-in-the-rye.jpg' },
  { id: 10, title: 'The Grapes of Wrath', coverUrl: 'https://example.com/covers/grapes-of-wrath.jpg' }
];



app.get("/", (req, res) => {
  res.send("Hello!");
});
app.post("/users/register", (req, res) => {
  res.status(201).send("User registered");
});
app.post("/users/login", (req, res) => {
  res.status(200).send("User logged in");
});
app.get("/users", (req, res) => {
  res.status(200).json(mockUsers);
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(id));
  if(user) {
    res.status(200).json(user);
  
  }
  else {
    res.status(404).send("User not found");
  }
});
// Route for updating a user's profile
app.put("/users/:id/profile", (req, res) => {
  const { id } = req.params;
  // Your logic for updating a user's profile
  res.status(200).send(`User ${id}'s profile updated`);
});
// Route for deleting a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  // Your logic for deleting a user
  res.status(204).send(); // No content to send back
});

// routes relating to an individual user
app.post("/users/:id/friends", (req, res) => {
  const { id } = req.params;
  // Your logic for adding a friend
  res.status(201).send(`Friend added to user ${id}`);
});
app.post("users/:id/books", (req, res) => {
  const { id } = req.params;
  const { bookId, listType } = req.body; // listType: 'current', 'wantToRead', or 'pastReads'
  // Logic to add bookId to the specified listType for userId
  res
    .status(201)
    .send(`Book ${bookId} added to ${listType} list for user ${userId}`);
});

// Get books from a specific reading list
app.get("/users/:userId/books", (req, res) => {
  const { userId } = req.params;
  const { listType } = req.query; // listType: 'current', 'wantToRead', or 'pastReads'
  // Logic to get all books from the specified listType for userId
  res.status(200).json({ userId, listType, books: ["book1Id", "book2Id"] });
});

// Get all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});
// get a book by its title
app.get("/books/:title", (req, res) => {
  const { title } = req.params;
  const lowerCaseTitle = title.toLowerCase();
  const matchingBooks = books.filter((books) => books.title.toLowerCase().includes(lowerCaseTitle));
  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports = app;
