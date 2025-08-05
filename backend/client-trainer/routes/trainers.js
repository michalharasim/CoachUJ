const express = require('express');
const { getTrainerById, getAllTrainers } = require('../controllers/trainerController');
const router = express.Router();

router.get('', getAllTrainers);
router.get('/:userId', getTrainerById);

module.exports = router;
