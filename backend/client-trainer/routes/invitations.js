const express = require('express');
const { sendInvitation, getPendingInvitations, respondToInvitation } = require('../controllers/invitationController');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');

router.post('/', verifyToken, sendInvitation);
router.get('/', verifyToken, getPendingInvitations);
router.post('/:id/respond', verifyToken, respondToInvitation);
module.exports = router;
