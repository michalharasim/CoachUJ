const express = require('express');
const { deleteConnection, getClientsOfTrainer } = require('../controllers/connectionController');
const router = express.Router();

router.delete('/:userID', deleteConnection);
router.get('/:trainerId/clients', getClientsOfTrainer);

module.exports = router;