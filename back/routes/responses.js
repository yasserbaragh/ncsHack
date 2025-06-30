const express = require('express');
const router = express.Router();
const responsesController = require('../controllers/responsesController');

// Route to add a response to a question
router.post('/', responsesController.addResponseToQuestion);

// Route to get all responses for a specific question
router.get('/question/:question_id', responsesController.getQuestionResponses);

// Route to edit a specific response by ID
router.put('/:id', responsesController.editResponse);

// Route to delete a specific response by ID
router.delete('/:id', responsesController.deleteResponse);

// Route to check a specific response by ID
router.get('/:id/check', responsesController.checkResponse);

module.exports = router;