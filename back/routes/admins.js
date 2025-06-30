const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController');

router.post('/', adminsController.createAdmin);
router.put('/:id', adminsController.editAdmin);
router.put('/:id/password', adminsController.editPassword);

module.exports = router;