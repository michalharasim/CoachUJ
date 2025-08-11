const express = require('express');
const { updateUserProfile, syncUserFromAuthorization, getUserProfile} = require('../controllers/userController');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');

router.patch('/profile/update', verifyToken, updateUserProfile);
router.post('/sync', syncUserFromAuthorization);
router.get('/profile', verifyToken,  getUserProfile);

module.exports = router;
