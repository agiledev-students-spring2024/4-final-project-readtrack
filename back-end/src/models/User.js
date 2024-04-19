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
  bio: {
    type: String,
    required: true,
    default: 'This user prefers to keep an air of mystery about them...'
  },

  // object with arrays of book references for each bookshelf , these will reference the ID's of the books
  books: {
    currentlyReading: [bookReference],
    finishedReading: [bookReference],
    wishlist: [bookReference],
    favorites: [bookReference],
    friendsReads: [bookReference],
    topReads: [bookReference],
    suggestions: [bookReference]
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
