const express = require('express');
const router = express.Router();
const investorsController = require('../controllers/investorsController');

router.get('/', investorsController.getAll);
router.post('/', investorsController.create);
router.put('/:id', investorsController.edit);
router.get('/:id', investorsController.getInvestorById);
router.get('/type/:type', investorsController.getInvestorByType);
router.delete('/:id', investorsController.deleteInvestor);

module.exports = router;