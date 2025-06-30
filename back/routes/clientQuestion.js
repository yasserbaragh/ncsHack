const express = require('express');
const router = express.Router();
const clientQuestionController = require('../controllers/clientQuestionController');

// Route to handle adding a new client question
router.post('/', clientQuestionController.addClientQuestion);

module.exports = router;