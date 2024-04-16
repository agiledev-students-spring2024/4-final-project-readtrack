const User = require("../../models/User");
const Book = require("../../models/Book");

// method to search all books in books collection
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const searchPattern = new RegExp(query, "i");
    const Books = await Book.find({
      $or: [
        { title: searchPattern },
        { author: searchPattern },
        { genres: searchPattern },
      ],
    });
    res.status(200).json(Books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching books");
  }
};

// get all books for a user
exports.getAllUserBooks = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('books.currentlyReading books.finishedReading books.wishlist books.favorites');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user.books);  // Returning the structured books object
  } catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
};


// get current reads
exports.getCurrentUserBooks = async (req, res) => {
  console.log("gets to getCurrentUserBooks")
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('books.currentlyReading');
    // console.log("user current reads in getCurrentUserBooks: ", user.books.currentlyReading)
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user.books.currentlyReading);
  } catch (error) {
    console.error("Failed to retrieve currently reading books:", error);
    res.status(500).send("Error retrieving user books");
  }
};


// get want to read
exports.getWantToRead = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('books.wishlist')
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(user.books.wishlist)
  }
  catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
}

// get favorites
exports.getFavorites = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('books.favorites')
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(user.books.favorites)
  }
  catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
}

// get past reads
exports.getPastReads = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('books.finishedReading')
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(user.books.finishedReading)
  }
  catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
}

exports.getFriendsReads = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('books.friendsReads')
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(user.books.friendsReads)
  }
  catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
}

exports.getTopReads = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('books.topReads')
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(user.books.topReads)
  }
  catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
}

exports.getSuggestions = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('books.suggestions')
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(user.books.suggestions)
  }
  catch (error) {
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");
  }
}

exports.getBook = async (req, res) => {
  const { bookId } = req.params

  try {
    const book = await Book.findById(bookId);
    res.status(200).json(book);
  } catch (error) {
    console.error("Failed to retrieve book:", error);
    res.status(500).send("Error retrieving book");
  }
};