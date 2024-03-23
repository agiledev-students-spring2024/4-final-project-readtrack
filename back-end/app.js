const { default: axios } = require("axios");
const express = require("express");
const app = express();
const mockUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com', books: ['The Great Gatsby', 'To Kill a Mockingbird'], profile: 'avatar1.png' },
  { id: 2, username: 'user2', email: 'user2@example.com', books: ['1984', 'Brave New World'], profile: 'avatar2.png' },
  { id: 3, username: 'user3', email: 'user3@example.com', books: ['The Catcher in the Rye', 'The Grapes of Wrath'], profile: 'avatar3.png' },
  { id: 4, username: 'user4', email: 'user4@example.com', books: ['The Great Gatsby', '1984'], profile: 'avatar4.png' }
  
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

module.exports = app;
