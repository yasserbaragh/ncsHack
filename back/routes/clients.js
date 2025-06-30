const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.post('/', clientsController.createClient);
router.get('/', clientsController.getAllClients);
router.get('/project/:project_id', clientsController.getClientByProject);
router.get('/:id', clientsController.getClientById);
router.put('/:id', clientsController.editClient);
router.delete('/:id', clientsController.deleteClient);
router.get('/:client_id/submissions', clientsController.getClientSubmissions);

module.exports = router;