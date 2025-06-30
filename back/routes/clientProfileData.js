const express = require('express');
const router = express.Router();
const clientProfileDataController = require('../controllers/clientProfileDataController');

router.post('/', clientProfileDataController.createProfileClient);
router.get('/:client_id', clientProfileDataController.getProfileClient);
router.put('/:client_id', clientProfileDataController.updateProfileClient);
router.delete('/:client_id', clientProfileDataController.deleteProfileClient);

module.exports = router;