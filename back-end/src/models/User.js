const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookReference = {
    type: Schema.Types.ObjectId,
    ref: 'Book'
};

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // object with arrays of book references for each bookshelf , these will reference the ID's of the books
  
  books: {
    currentlyReading: [bookReference],
    finishedReading: [bookReference],
    wishlist: [bookReference],
    favorites: [bookReference]
  },
  profile: {
    type: String,
    default: 'default_avatar.png'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
