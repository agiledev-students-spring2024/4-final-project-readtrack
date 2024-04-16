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
router.put('/user/:id', authenticateToken, userController.updateUser)
router.delete('/user/:id', authenticateToken, userController.deleteUser)

// not a user route but GENERAL book search
router.get('/books/search', authenticateToken, userBooksController.searchBooks)
//Nested routes for users books
router.get('/users/:id/books', authenticateToken, userBooksController.getAllUserBooks)
router.get('/users/:id/books/currentReads', authenticateToken, userBooksController.getCurrentUserBooks)
// want to read
router.get('/users/:id/books/wantToRead', authenticateToken, userBooksController.getWantToRead)
// favorites
router.get('/users/:id/books/favorites', authenticateToken, userBooksController.getFavorites)
//past reads
router.get('/users/:id/books/pastReads', authenticateToken, userBooksController.getPastReads)

// TODO: starting from get friends' current reads books in app.js

module.exports = router
