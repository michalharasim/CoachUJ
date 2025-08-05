const express = require('express');
const { deleteConnection, getClientsOfTrainer } = require('../controllers/connectionController');
const verifyToken = require('../../Authorization/authMiddleware');
const router = express.Router();

router.delete('/:userID', verifyToken, deleteConnection);
router.get('/clients', verifyToken, getClientsOfTrainer);

module.exports = router;