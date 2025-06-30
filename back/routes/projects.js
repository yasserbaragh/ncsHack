const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.post('/', projectsController.addProject);
router.delete('/:id', projectsController.deleteProject);
router.get('/:id', projectsController.getProjectById);
router.get('/investor/:investor_id', projectsController.getProjectsByInvestor);
router.get('/client/:client_id', projectsController.getProjectsByClients);

module.exports = router;