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
exports.getAllUserBooks = async (req, res) =>
{
const {id} = req.params
try
{
// we find the user then pull the "documents" it references to get all books associated with user
const user = await User.findById(id).populate('books.currentlyreading books.finishedReading books.wishlist books.favorites')
if(!user)
{
    return res.status(404).send('User not found')
}
res.status(200).json(user.books) // return all books associated with user (might need to structure differently)

}
catch(error)
{
    console.error("Failed to retrieve user books:", error);
    res.status(500).send("Error retrieving user books");

}
}
// TODO: implement getCurrentUserBooks , getWantToRead , getFavorites , getPastReads 