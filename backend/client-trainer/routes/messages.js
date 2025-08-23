const express = require('express');
const { getMessages, sendMessage } = require('../controllers/messageController');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');

router.get('/', verifyToken, getMessages);
router.post('/', verifyToken, sendMessage);

module.exports = router;