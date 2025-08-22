const User = require('../models/User');
const ClientCoachLink = require('../models/ClientCoachLink');
const ApiError = require('../utils/ApiError');
const {Sequelize} = require("sequelize");

const getAllTrainers = async (req, res) => {
  const requestUserId = req.user_id;
  try {
    const links = await ClientCoachLink.findAll({
      where: { clientID: requestUserId },
      attributes: ['coachID'],
    });

    const connectedCoachIds = links.map(link => link.coachID);

    const trainers = await User.findAll({
      where: { role: 'trainer' },
    });

    const trainersWithStatus = trainers.map(trainer => ({
      ...trainer.toJSON(),
      isConnected: connectedCoachIds.includes(trainer.userID),
    }));

    res.json(trainersWithStatus);
  } catch (err) {
    console.error('Error fetching trainers:', err);
    res.status(500).json({ error: 'Failed to fetch trainers' });
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
