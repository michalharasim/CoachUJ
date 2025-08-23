const express = require('express');
const { deleteConnection, getConnectedUsers } = require('../controllers/connectionController');
const verifyToken = require('../../Authorization/authMiddleware');
const router = express.Router();

router.delete('/:userID', verifyToken, deleteConnection);
router.get('/', verifyToken, getConnectedUsers);


module.exports = router;