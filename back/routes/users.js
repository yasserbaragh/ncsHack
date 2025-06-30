const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route to create a new user
router.post('/', usersController.createUser);

// Route to edit a user's email by ID
router.put('/:id/email', usersController.editEmail);

// Route to change a user's password by ID
router.put('/:id/password', usersController.changePassword);

// Route to delete a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;