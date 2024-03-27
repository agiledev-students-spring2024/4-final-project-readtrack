const { default: axios } = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
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
      username: "user1",
      email: "user1@example.com",
      password: hashedPassword,
      books: ["The Great Gatsby", "To Kill a Mockingbird"],
      profile: "avatar1.png",
    },
    {
      id: 2,
      fullname: "J Doe",
      username: "user2",
      email: "user2@example.com",
      password: hashedPassword,
      books: ["1984", "Brave New World"],
      profile: "avatar2.png",
    },
    {
      id: 3,
      username: "user3",
      fullname: "John D",
      email: "user3@example.com",
      password: hashedPassword,
      books: ["The Catcher in the Rye", "The Grapes of Wrath"],
      profile: "avatar3.png",
    },
    {
      id: 4,
      username: "user4",
      fullname: "John H. Doe",
      email: "user4@example.com",
      password: hashedPassword,
      books: ["The Great Gatsby", "1984"],
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
    coverUrl: "https://example.com/covers/secret-garden.jpg",
  },
  {
    id: 2,
    title: "The Adventures of Sherlock Holmes",
    coverUrl: "https://example.com/covers/sherlock-holmes.jpg",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    coverUrl: "https://example.com/covers/pride-prejudice.jpg",
  },
  {
    id: 4,
    title: "Moby-Dick",
    coverUrl: "https://example.com/covers/moby-dick.jpg",
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    coverUrl: "https://example.com/covers/to-kill-a-mockingbird.jpg",
  },
  {
    id: 6,
    title: "The Great Gatsby",
    coverUrl: "https://example.com/covers/great-gatsby.jpg",
  },
  { id: 7, title: "1984", coverUrl: "https://example.com/covers/1984.jpg" },
  {
    id: 8,
    title: "Brave New World",
    coverUrl: "https://example.com/covers/brave-new-world.jpg",
  },
  {
    id: 9,
    title: "The Catcher in the Rye",
    coverUrl: "https://example.com/covers/catcher-in-the-rye.jpg",
  },
  {
    id: 10,
    title: "The Grapes of Wrath",
    coverUrl: "https://example.com/covers/grapes-of-wrath.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/users/register", async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).send('Please provide a username, email, and password.');
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
      profile: 'default_avatar.png',
    };

    mockUsers.push(newUser);
    // not sending back hashed password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error while registering user.');
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = mockUsers.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error while logging in.');
  }
});

app.get("/users", (req, res) => {
  res.status(200).json(mockUsers);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { fullname, username, email } = req.body;

  const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], fullname, username, email };
    res.status(200).json(mockUsers[userIndex]);
  } else {
    res.status(404).send("User not found");
  }
});

// Route for deleting a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));

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

// Get all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
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
