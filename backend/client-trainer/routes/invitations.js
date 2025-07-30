const express = require('express');
const { sendInvitation, getPendingInvitations, respondToInvitation } = require('../controllers/invitationController');
const router = express.Router();

router.post('/', sendInvitation);
router.get('/', getPendingInvitations);
router.post('/:id/respond', respondToInvitation);
module.exports = router;
