const express = require("express");
const app = express();

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
  res.status(200).send("Here are all the users");
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(`Here is user ${req.params.id}`);
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
