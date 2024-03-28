const { default: axios } = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(express.json());
app.use(cors());

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
        currentlyReading: [1, 2], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
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
        currentlyReading: [1, 2], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
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
        currentlyReading: [1, 2], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
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
        currentlyReading: [1, 2], // These are book IDs
        finishedReading: [3],
        wishlist: [4],
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

// const books = [
//   {
//     id: 1,
//     title: "The Secret Garden",
//     coverUrl: "https://example.com/covers/secret-garden.jpg",
//   },
//   {
//     id: 2,
//     title: "The Adventures of Sherlock Holmes",
//     coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
//   },
//   {
//     id: 3,
//     title: "Pride and Prejudice",
//     coverUrl: "https://example.com/covers/pride-prejudice.jpg",
//   },
//   {
//     id: 4,
//     title: "Moby-Dick",
//     coverUrl: "https://example.com/covers/moby-dick.jpg",
//   },
//   {
//     id: 5,
//     title: "To Kill a Mockingbird",
//     coverUrl: "https://example.com/covers/to-kill-a-mockingbird.jpg",
//   },
//   {
//     id: 6,
//     title: "The Great Gatsby",
//     coverUrl: "https://example.com/covers/great-gatsby.jpg",
//   },
//   { id: 7, title: "1984", coverUrl: "https://example.com/covers/1984.jpg" },
//   {
//     id: 8,
//     title: "Brave New World",
//     coverUrl: "https://example.com/covers/brave-new-world.jpg",
//   },
//   {
//     id: 9,
//     title: "The Catcher in the Rye",
//     coverUrl: "https://example.com/covers/catcher-in-the-rye.jpg",
//   },
//   {
//     id: 10,
//     title: "The Grapes of Wrath",
//     coverUrl: "https://example.com/covers/grapes-of-wrath.jpg",
//   },
// ];

const books = [
  {
    id: 1,
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    description:
      "A classic novel about a young girl who discovers a hidden garden.",
    pages: 256,
    genres: ["Children's Literature", "Fiction"],
    publishedDate: "1911-05-01",
    coverUrl: "https://example.com/covers/secret-garden.jpg",
  },
  {
    id: 2,
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    description:
      "A collection of detective stories featuring the famous Sherlock Holmes.",
    pages: 307,
    genres: ["Mystery", "Crime Fiction"],
    publishedDate: "1892-10-14",
    coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
  },
  {
    id: 3,
    title: "The Adventures of Sherlock Holmes 3",
    author: "Arthur Conan Doyle 3",
    description:
      "A collection of detective stories featuring the famous Sherlock Holmes.",
    pages: 307,
    publishedDate: "1892-10-14",
    coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
  },
  {
    id: 4,
    title: "The Adventures of Sherlock Holmes 4",
    author: "Arthur Conan Doyle 4",
    description:
      "A collection of detective stories featuring the famous Sherlock Holmes.",
    pages: 307,
    genres: ["Mystery", "Crime Fiction"],
    publishedDate: "1892-10-14",
    coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
  },
  {
    id: 5,
    title: "The Adventures of Sherlock Holmes 5",
    author: "Arthur Conan Doyle 5",
    description:
      "A collection of detective stories featuring the famous Sherlock Holmes.",
    pages: 307,
    genres: ["Mystery", "Crime Fiction"],
    publishedDate: "1892-10-14",
    coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
  },
  {
    id: 6,
    title: "The Adventures of Sherlock Holmes 6",
    author: "Arthur Conan Doyle 6",
    description:
      "A collection of detective stories featuring the famous Sherlock Holmes.",
    pages: 307,
    genres: ["Mystery", "Crime Fiction"],
    publishedDate: "1892-10-14",
    coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
  },
];

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

    mockUsers.push(newUser);
    // not sending back hashed password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
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

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
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
app.get("/users/:userId/books/currentReads", (req, res) => {
  const { userId } = req.params;
  const user = mockUsers.find(user => user.id === parseInt(userId));
  if (user) {
    const currentlyReadingBooks = user.books.currentlyReading
      .map(bookId => books.find(book => book.id === bookId))
      .filter(book => book !== undefined); // Filter out undefined values
    res.status(200).json(currentlyReadingBooks);
    console.log('Currently reading books:', currentlyReadingBooks); // Log the books
  } else {
    res.status(404).send("User not found");
  }
});


// Getting User 'want to read' books
app.get("/users/:userId/books/WanttoRead", (req, res) => {
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const wantToReadBooks = user.books.wishlist
      .map((bookId) => books.find((book) => book.id === bookId))
      .filter((book) => book !== undefined); // Filter out undefined values
    res.status(200).json(wantToReadBooks);
    console.log('Want to read books', wantToReadBooks); // Log the books
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
    console.log('Past reads books:', pastReadsBooks); // Log the books
  } else {
    res.status(404).send("User not found");
  }
});

// Get friends' current reads books
app.get("/users/:userId/books/FriendsCurrentReads", (req, res) => {
  // modify mockUsers to include friend info
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const friendsCurrentReads = [
      {
        id: 1,
        title: "Friend's Current Read 1",
        coverUrl: "https://example.com/covers/friends-current-read-1.jpg",
      },
      {
        id: 2,
        title: "Friend's Current Read 2",
        coverUrl: "https://example.com/covers/friends-current-read-2.jpg",
      },
    ];
    res.status(200).json(friendsCurrentReads);
  } else {
    res.status(404).send("User not found");
  }
});

// Getting this week's top 10 reads books
app.get("/users/:userId/books/ThisWeek'sTop10Reads", (req, res) => {
  // may need to modify  books data structure to include popularity info get top 10 books based on that
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const top10Reads = [
      {
        id: 1,
        title: "Top Read 1",
        coverUrl: "https://example.com/covers/top-read-1.jpg",
      },
      {
        id: 2,
        title: "Top Read 2",
        coverUrl: "https://example.com/covers/top-read-2.jpg",
      },
    ];
    res.status(200).json(top10Reads);
  } else {
    res.status(404).send("User not found");
  }
});

// Getting book suggestions
app.get("/users/:userId/books/SuggestionsforYou", (req, res) => {
  // analyze user reading preferences, genres, to generate suggestions
  const { userId } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(userId));
  if (user) {
    const suggestions = [
      {
        id: 1,
        title: "Suggested Book 1",
        coverUrl: "https://example.com/covers/suggested-book-1.jpg",
      },
      {
        id: 2,
        title: "Suggested Book 2",
        coverUrl: "https://example.com/covers/suggested-book-2.jpg",
      },
      // more suggestions ..........
    ];
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
