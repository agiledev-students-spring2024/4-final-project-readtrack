const { default: axios } = require("axios");
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(express.json());
app.use(cors());
// the following are used for authentication with JSON Web Tokens
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');


/*
try {
  mongoose.connect(process.env.URI)
  console.log("Connected to MongoDB")
}
catch (error) {
  console.log(error)
}
*/


async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function initializeMockUsers() {
  const hashedPassword = await hashPassword("123");

  return [
    {
      id: 1,
      fullname: "John Doe",
      username: "John",
      email: "user1@example.com",
      password: hashedPassword,
      books: {
        currentlyReading: [1, 2, 6, 4, 5], // These are book IDs
        finishedReading: [3, 8],
        wishlist: [4],
        favorites: [3, 4, 5],
      },
      profile: "avatar1.png",
    },
    {
      id: 2,
      fullname: "J Doe",
      username: "user2",
      email: "user2@example.com",
      password: hashedPassword,
      books: {
        currentlyReading: [7, 9], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
        favorites: [3],
      },
      profile: "avatar2.png",
    },
    {
      id: 3,
      username: "user3",
      fullname: "John D",
      email: "user3@example.com",
      password: hashedPassword,
      books: {
        currentlyReading: [10], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
        favorites: [3],
      },
      profile: "avatar3.png",
    },
    {
      id: 4,
      username: "user4",
      fullname: "John H. Doe",
      email: "user4@example.com",
      password: hashedPassword,
      books: {
        currentlyReading: [4, 8, 10, 3], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
        favorites: [3],
      },
      profile: "avatar4.png",
    },
  ];
}

let mockUsers = [];

initializeMockUsers()
  .then((initializedUsers) => {
    mockUsers = initializedUsers;
  })
  .catch((error) => {
    console.error("Error initializing mock users:", error);
  });

const books = [
  {
    id: 1,
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    description:
      "A ten-year-old orphan comes to live in a lonely house on the Yorkshire moors where she discovers an invalid cousin and the mysteries of a locked garden.",
    pages: 256,
    genres: ["Friendship", "Fiction"],
    publishedDate: "1911",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL37044748M-M.jpg",
  },
  {
    id: 2,
    title: "Wide Sargasso Sea",
    author: "Jean Rhys",
    description:
      "Jean Rhys wrote this feminist and anti-colonial prequel to Charlotte Bronte’s novel Jane Eyre which chronicles the events of Mr Rochester’s disastrous marriage to Antoinette Conway or Bertha as we come to know her.",
    pages: 156,
    genres: ["Race", "Colonialism"],
    publishedDate: "1966",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL28464070M-M.jpg",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "Philosophy, history, wit, and the most passionate love story.",
    pages: 345,
    genres: ["Courtship", "Fiction"],
    publishedDate: "1813",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL50444320M-M.jpg",
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A jarring & poignantly beautiful story about how humans treat each other.",
    pages: 281,
    genres: ["Fiction", "Racial segregation"],
    publishedDate: "1892",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL37027584M-M.jpg",
  },
  {
    id: 5,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "The greatest, most scathing dissection of the hollowness at the heart of the American dream.",
    pages: 281,
    genres: ["Fiction", "Psychological"],
    publishedDate: "1920",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL35657482M-M.jpg",
  },
  {
    id: 6,
    title: "Gentle Reminder",
    author: "Bianca Sparacino",
    description:
      "A gentle reminder for the days you feel light in this world, and for the days in which the sun rises a little slower.",
    pages: null,
    genres: ["Self-help", "Mindfulness"],
    publishedDate: "2020",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL34147323M-M.jpg",
  },
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    description:
      "Thematically, Nineteen Eighty-Four centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviours within society.",
    pages: 248,
    genres: ["Futurology", "Surveillance"],
    publishedDate: "1949",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL37824529M-M.jpg",
  },
  {
    id: 8,
    title: "The Laws of human nature",
    author: "Robert Greene",
    description:
      "Whether at work, in relationships, or in shaping the world around you, The Laws of Human Nature offers brilliant tactics for success, self-improvement, and self-defense",
    pages: 609,
    genres: ["Self-control", "Motivation"],
    publishedDate: "2018",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL26974419M-M.jpg",
  },
  {
    id: 9,
    title: "Ons feilbare denken",
    author: "Daniel Kahneman",
    description:
      "Thinking, Fast and Slow, Daniel Kahneman, world-famous psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    pages: 527,
    genres: ["Psychology"],
    publishedDate: "2011",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL39216579M-M.jpg",
  },
  {
    id: 10,
    title: "101 Essays That Will Change The Way You Think",
    author: "Brianna Wiest",
    description:
      "101 Essays That Will Change The Way You Think, the global bestseller and social media phenomenon, is a collection of author Brianna Wiest's most beloved pieces of writing.",
    pages: 448,
    genres: ["Self-help", "Mindfulness"],
    publishedDate: "2018",
    coverUrl: "https://covers.openlibrary.org/b/OLID/OL31489498M-M.jpg",
  },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("Hello!");
});

// User registration
app.post("/users/register", async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res
      .status(400)
      .send("Please provide a username, email, and password.");
  }

  try {
    // hashing password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: mockUsers.length + 1,
      fullname,
      username,
      email,
      password: hashedPassword,
      bio: "",
      books: [],
      profile: "default_avatar.png",
    };

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET
    );

    mockUsers.push(newUser);
    // not sending back hashed password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while registering user.");
  }
});

// User login
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = mockUsers.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign(user, process.env.JWT_SECRET);

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while logging in.");
  }
});

// Getting all Users
app.get("/users", (req, res) => {
  res.status(200).json(mockUsers);
});

// Getting Users by their id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Getting user by id (for editing their profile )
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { fullname, username, email } = req.body;

  const userIndex = mockUsers.findIndex((user) => user.id === parseInt(id));
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      fullname,
      username,
      email,
    };
    res.status(200).json(mockUsers[userIndex]);
  } else {
    res.status(404).send("User not found");
  }
});

// Deleting a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = mockUsers.findIndex((user) => user.id === parseInt(id));

  if (userIndex > -1) {
    mockUsers.splice(userIndex, 1); // Removes the user at the found index
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
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

// Getting User 'currently reading' books
app.get("/users/:userId/books/currentReads", authenticateToken, (req, res) => {
  const { userId } = req.params;
  const user = req.user;
  // const user = mockUsers.find(user => user.id === parseInt(userId));
  if (user) {
    const currentlyReadingBooks = (user.books.currentlyReading || [])
      .map(bookId => books.find(book => book.id === bookId))
      .filter(book => book !== undefined);
    res.status(200).json(currentlyReadingBooks);
  } else {
    res.status(404).send("User not found");
  }
});


// Getting User 'want to read' books
app.get("/users/:userId/books/WanttoRead", (req, res) => {
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const wantToReadBooks = (user.books.wishlist || [])
      .map((bookId) => books.find((book) => book.id === bookId))
      .filter((book) => book !== undefined);
    res.status(200).json(wantToReadBooks);
  } else {
    res.status(404).send("User not found");
  }
});

// Getting User 'favorites' books
app.get("/users/:userId/books/favorites", (req, res) => {
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const favorites = user.books.favorites
      .map((bookId) => books.find((book) => book.id === bookId))
      .filter((book) => book !== undefined); // Filter out undefined values
    res.status(200).json(favorites);
  } else {
    res.status(404).send("User not found");
  }
});

// Getting User 'past reads' books
app.get("/users/:userId/books/PastReads", (req, res) => {
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const pastReadsBooks = user.books.finishedReading
      .map((bookId) => books.find((book) => book.id === bookId))
      .filter((book) => book !== undefined); // Filter out undefined values

    res.status(200).json(pastReadsBooks);
  } else {
    res.status(404).send("User not found");
  }
});

// Get friends' current reads books
app.get("/users/:userId/books/FriendsCurrentReads", (req, res) => {
  // Assuming user 2 is a friend of the logged-in user
  const friendId = 2;
  const friend = mockUsers.find((user) => user.id === friendId);

  if (friend) {
    const friendsCurrentReads = friend.books.currentlyReading
      .map((bookId) => books.find((book) => book.id === bookId))
      .filter((book) => book !== undefined);
    res.status(200).json(friendsCurrentReads);
  } else {
    res.status(404).send("Friend not found");
  }
});

// Getting this week's top 10 reads books
app.get("/users/:userId/books/ThisWeek'sTop10Reads", (req, res) => {
  // randomly select 10 books from 'books' array
  const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
  const top10Reads = shuffledBooks.slice(0, 10);
  res.status(200).json(top10Reads);
});

// Getting book suggestions
app.get("/users/:userId/books/SuggestionsforYou", (req, res) => {
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));

  if (user) {
    // suggestions based on user currently reading books
    const currentlyReadingGenres = (user.books.currentlyReading || [])
      .map((bookId) => {
        const book = books.find((book) => book.id === bookId);
        return book ? book.genres : [];
      })
      .flat();

    // filter books based on genres & exclude currently reading books
    const filteredBooks = books.filter(
      (book) =>
        book.genres.some((genre) => currentlyReadingGenres.includes(genre)) &&
        !user.books.currentlyReading.includes(book.id)
    );

    // randomly select 5 books from the filtered books
    const shuffledBooks = [...filteredBooks].sort(() => 0.5 - Math.random());
    const suggestions = shuffledBooks.slice(0, 5);
    res.status(200).json(suggestions);
  } else {
    res.status(404).send("User not found");
  }
});

// Get all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// Getting a book by its id
app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const book = books.find((book) => book.id === parseInt(bookId));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// get a book by its title
app.get("/books/:title", (req, res) => {
  const { title } = req.params;
  const lowerCaseTitle = title.toLowerCase();
  const matchingBooks = books.filter((books) =>
    books.title.toLowerCase().includes(lowerCaseTitle)
  );
  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports = app;
