const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

router.post('/', questionsController.addQuestionToQcm);
router.delete('/:id', questionsController.deleteQuestion);
router.put('/:id', questionsController.editQuestion);
router.get('/qcm/:qcm_id', questionsController.getQcmQeustions);

module.exports = router;