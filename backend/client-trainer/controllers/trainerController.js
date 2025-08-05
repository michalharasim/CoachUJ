const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.findAll({
      where: { role: 'trainer' }
    });

    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu trenerów' });
  }
};

const getTrainerById = async (req, res) => {
  try {
    const trainer = await User.findOne({
      where: {
        userID: req.params.userId,
        role: 'trainer'
      }
    });

    if (!trainer) {
      throw new ApiError(404, 'Trainer with the given ID not found');
    }

    res.status(200).json(trainer);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = { getTrainerById, getAllTrainers };
