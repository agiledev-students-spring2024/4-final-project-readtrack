const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userBooksController = require('../controllers/userBooksController')
const { authenticateToken } = require('../middleware/authMiddleware')

// Basic user routes
router.post('/register', userController.register)
router.post('/login', userController.login);
router.get('/logout', userController.logout)
router.get('/users', authenticateToken, userController.getAllUsers)
router.get('/users/:id', authenticateToken, userController.getUser)
router.put('/users/update/:id', authenticateToken, userController.updateUser)
router.delete('/user/:id', authenticateToken, userController.deleteUser)

// not a user route but GENERAL book search
router.get('/books/search', userBooksController.searchBooks)
//Nested routes for users books
router.get('/users/:id/books', authenticateToken, userBooksController.getAllUserBooks)
router.get('/users/:id/books/currentReads', authenticateToken, userBooksController.getCurrentUserBooks)
// want to read
router.get('/users/:id/books/wishlist', authenticateToken, userBooksController.getWishlist)
// favorites
router.get('/users/:id/books/favorites', authenticateToken, userBooksController.getFavorites)
//past reads
router.get('/users/:id/books/pastReads', authenticateToken, userBooksController.getPastReads)

router.get('/users/:id/books/friendsReads', authenticateToken, userBooksController.getFriendsReads)
router.get('/users/:id/books/topReads', authenticateToken, userBooksController.getTopReads)
router.get('/users/:id/books/suggestions', authenticateToken, userBooksController.getSuggestions)

router.get('/books/:bookId', authenticateToken, userBooksController.getBook)
router.get('/books', authenticateToken, userBooksController.getManyBooks)

// Nested routes for user's books
router.post('/users/:id/currentlyReading', authenticateToken, userBooksController.addBookToCurrentlyReading)
router.delete('/users/:id/currentlyReading', authenticateToken, userBooksController.removeBookFromCurrentlyReading);
router.post('/users/:id/finishedReading', authenticateToken, userBooksController.addBookToFinishedReading)
router.delete('/users/:id/finishedReading', authenticateToken, userBooksController.removeBookFromFinishedReading);
// wishlist
router.post('/users/:id/wishlist', authenticateToken, userBooksController.addBookToWishlist)
router.delete('/users/:id/wishlist', authenticateToken, userBooksController.removeBookFromWishlist);

// favorites
router.post('/users/:id/favorites', authenticateToken, userBooksController.toggleFavoriteBook)

module.exports = router
