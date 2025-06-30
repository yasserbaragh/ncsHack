const express = require('express');
const router = express.Router();
const qcmsController = require('../controllers/qcmsController');

router.post('/', qcmsController.addQcm);
router.get('/', qcmsController.getAllQcm);
router.get('/niche/:niche', qcmsController.getQcmByNiche);
router.get('/:id', qcmsController.getQcmById);
router.delete('/:id', qcmsController.deleteQcm);

module.exports = router;