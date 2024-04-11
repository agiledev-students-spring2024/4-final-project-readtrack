const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userBooksController = require('../controllers/userBooksController')
// Basic user routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/users', userController.getAllUsers)
router.get('/user/:id', userController.getUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
 
//Nested routes for users books
router.get('/users/:id/books', userBooksController.getAllUserBooks)
router.get('/users/:id/books/currentReads', userBooksController.getCurrentUserBooks)
// want to read
router.get('/users/:id/books/wantToRead', userBooksController.getWantToRead)
// favorites
router.get('/users/:id/books/favorites', userBooksController.getFavorites)
//past reads
router.get('/users/:id/books/pastReads', userBooksController.getPastReads)

// TODO: starting from get friends' current reads books in app.js

module.exports = router
