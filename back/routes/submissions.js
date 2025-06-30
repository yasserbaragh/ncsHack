const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissionsController');

router.post('/', submissionsController.create);
router.get('/', submissionsController.getAll);
router.get('/:id', submissionsController.getById);
router.put('/:id', submissionsController.update);
router.delete('/:id', submissionsController.delete);
router.put('/:id/accept', submissionsController.acceptSubmission);
router.get('/status/waiting', submissionsController.getWaiting);
router.get('/status/accepted', submissionsController.getAccepted);

module.exports = router;