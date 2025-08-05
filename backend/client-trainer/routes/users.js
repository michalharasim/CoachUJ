const express = require('express');
const { updateUserProfile, syncUserFromAuthorization } = require('../controllers/userController');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');

router.patch('/:userId', verifyToken, updateUserProfile);
router.post('/sync', syncUserFromAuthorization);

module.exports = router;
