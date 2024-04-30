const User = require("../../models/User");
const Book = require("../../models/Book");
const axios = require("axios");

// utility function to update a user's book list
async function updateUserBookList(userId, bookId, listType) {
  try {
    const update = { $addToSet: { [`books.${listType}`]: bookId } };
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating user book list:", error);
    throw error;
  }
}
async function removeBookFromUserList(userId, bookId, listType) {
  try {
    const update = { $pull: { [`books.${listType}`]: bookId } };
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true, // Return the modified document rather than the original
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser
  } catch (error) {
    console.error("Error updating user book list:", error);
    throw error; // Re-throw to handle in the calling function
  }
}
async function getBookDetails(bookIds) {
  const G_BOOKS_API_KEY = process.env.G_BOOKS_API_KEY;
  const bookData = [];

  for (const bookId of bookIds) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${G_BOOKS_API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const book = {
        id: response.data.id,
        title: response.data.volumeInfo.title,
        authors: response.data.volumeInfo.authors[0],
        thumbnail: response.data.volumeInfo.imageLinks?.medium,
      };
      bookData.push(book);
    } catch (error) {
      console.error(`Error retrieving book details for bookId ${bookId}:`, error);
    }
  }

  return bookData;
}

// method to search all books in books collection
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  const G_BOOKS_API_KEY = process.env.G_BOOKS_API_KEY;
  const maxResults = 9; // Adjust the number of results as needed

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${G_BOOKS_API_KEY}`;

    const response = await axios.get(apiUrl);
    const bookData = response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      // Add other relevant book properties
    }));

    res.status(200).json(bookData);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).send("Error searching books");
  }
};

// get all books for a user
exports.getAllUserBooks = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate(
      "books.currentlyReading books.finishedReading books.wishlist books.favorites"
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.books); // Returning the structured books object
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

// get current reads
exports.getCurrentUserBooks = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("books.currentlyReading");
    // console.log("user current reads in getCurrentUserBooks: ", user.books.currentlyReading)
    if (!user) {
      return res.status(404).send("User not found");
    }
    const bookIds = user.books.currentlyReading;
    const bookDetails = await getBookDetails(bookIds);
    res.status(200).json(bookDetails);
  } catch (error) {
    console.error("Failed to retrieve currently reading books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

// get want to read
exports.getWishlist = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("books.wishlist");
    if (!user) {
      return res.status(404).send("User not found");
    }
    const bookIds = user.books.wishlist;
    const bookDetails = await getBookDetails(bookIds);
    res.status(200).json(bookDetails);
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

// get favorites
exports.getFavorites = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const bookIds = user.books.favorites;
    const bookDetails = await getBookDetails(bookIds);
    res.status(200).json(bookDetails);
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

// get past reads
exports.getPastReads = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("books.finishedReading");
    if (!user) {
      return res.status(404).send("User not found");
    }

    const bookIds = user.books.finishedReading;
    const bookDetails = await getBookDetails(bookIds);
    res.status(200).json(bookDetails);
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

exports.getFriendsReads = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("books.friendsReads");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.books.friendsReads);
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

exports.getTopReads = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("books.topReads");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.books.topReads);
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

exports.getSuggestions = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("books.suggestions");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.books.suggestions);
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};

// Controller to add a book to currently reading
exports.addBookToCurrentlyReading = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body;

  try {
    // await validateBook(bookId);
    const user = await updateUserBookList(userId, bookId, "currentlyReading");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.removeBookFromCurrentlyReading = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body; // Assuming bookId is sent in the body

  try {
    const user = await removeBookFromUserList(userId, bookId, "currentlyReading");
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).send('User not found');
    }
    res.status(500).send('Error updating currently reading list');
  }
};
exports.removeBookFromFinishedReading = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body; // Assuming bookId is sent in the body

  try {
    const user = await removeBookFromUserList(userId, bookId, "finishedReading");
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).send('User not found');
    }
    res.status(500).send('Error updating finished reading list');
  }
}

exports.removeBookFromWishlist = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body; // Assuming bookId is sent in the body

  try {
    const user = await removeBookFromUserList(userId, bookId, "wishlist");
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).send('User not found');
    }
    res.status(500).send('Error updating wishlist');
  }
}


// Controller to add a book to finished reading
exports.addBookToFinishedReading = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body;

  try {
    const user = await updateUserBookList(userId, bookId, "finishedReading");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller to add a book to wishlist
exports.addBookToWishlist = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body;

  try {
    const user = await updateUserBookList(userId, bookId, "wishlist");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.toggleFavoriteBook = async (req, res) => {
  const userId = req.params.id;
  const { bookId } = req.body;

  try {

    // Find the user and determine if the book is already a favorite
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const index = user.books.favorites.indexOf(bookId);

    if (index === -1) {
      // Book is currently a favorite, so remove it
      user.books.favorites.push(bookId);
    } else {
      // Book is not a favorite, so add it
      user.books.favorites.splice(index, 1);
    }

    await user.save(); // Save the updated user document
    // console.log('Updated user:', user);

    res.status(200).json({ isFavorite: index < 0 }); // Respond with the new favorite status
  } catch (error) {
    console.error('Error toggling favorite book:', error);
    res.status(500).send('Error updating favorite books');
  }
};

exports.getManyBooks = async (req, res) => {
  try {
    const G_BOOKS_API_KEY = process.env.G_BOOKS_API_KEY;
    const maxResults = 21;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=${maxResults}&orderBy=newest&key=${G_BOOKS_API_KEY}`;

    const response = await axios.get(apiUrl);
    const bookData = response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    }));
    res.status(200).json(bookData);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).send('Error retrieving books');
  }
};

exports.getBook = async (req, res) => {
  const { bookId } = req.params;
  const G_BOOKS_API_KEY = process.env.G_BOOKS_API_KEY;

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${G_BOOKS_API_KEY}`;
    const response = await axios.get(apiUrl);
    const bookData = response.data;
    console.log('bookdata:', bookData)

    const book = {
      id: bookData.id,
      title: bookData.volumeInfo.title,
      author: bookData.volumeInfo.authors?.join(", ") || "Unknown Author",
      thumbnail: bookData.volumeInfo.imageLinks?.thumbnail || bookData.volumeInfo.imageLinks?.medium || null,
      description: bookData.volumeInfo.description,
      pages: bookData.volumeInfo.pageCount,
      genres: bookData.volumeInfo.categories,
      publishedDate: bookData.volumeInfo.publishedDate,
    };

    res.status(200).json(book);
  } catch (error) {
    console.error("Failed to retrieve book:", error);
    res.status(500).send("Error retrieving book");
  }
};
