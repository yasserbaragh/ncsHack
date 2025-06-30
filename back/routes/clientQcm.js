const express = require('express');
const router = express.Router();
const clientQcmController = require('../controllers/clientQcmController');

// Route to add a new QCM client
router.post('/', clientQcmController.addQcmClient);

module.exports = router;