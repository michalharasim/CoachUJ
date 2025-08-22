const express = require('express');
const { getTrainerById, getAllTrainers } = require('../controllers/trainerController');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');

router.get('', verifyToken, getAllTrainers);
router.get('/:userId', getTrainerById);

module.exports = router;
