const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    // Making pages optional since one of your books has null pages, indicating it might not be applicable for all books.
    required: false
  },
  genres: [{
    type: String,
    required: true
  }],
  publishedDate: {
    type: String, // Storing as a string to allow for a wide range of date formats, but consider Date type if you need date operations.
    required: true
  },
  coverUrl: {
    type: String,
    required: false // Assuming the cover image might not be available for all books.
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
