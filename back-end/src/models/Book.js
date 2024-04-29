const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleBookId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: false
  },
  categories: [{
    type: String,
    required: false
  }],
  publishedDate: {
    type: String,
    required: false
  },
  thumbnailUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;