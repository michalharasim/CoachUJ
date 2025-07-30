const express = require('express');
const { getTrainerById, updateTrainerProfile, getAllTrainers } = require('../controllers/trainerController');
const router = express.Router();

router.get('', getAllTrainers);
router.get('/:userId', getTrainerById);
router.patch('/:userId', updateTrainerProfile);

module.exports = router;
