const User = require('../models/User');
const ClientCoachLink = require('../models/ClientCoachLink');
const ApiError = require('../utils/ApiError');

const getAllTrainers = async (req, res) => {
  const requestUserId = req.user_id;
  try {
    const trainers = await User.findAll({
      where: { role: 'trainer' }
    });

    const trainersWithStatus = await Promise.all(
        trainers.map(async (trainer) => {
          try {
            const isConnected = await ClientCoachLink.findOne({
              where: {
                clientID: String(requestUserId),
                coachID: trainer.userID,
              },
            });

            return {
              ...trainer.toJSON(),
              isConnected: !!isConnected,
            };
          } catch (innerError) {
            console.error(`Error processing trainer with ID ${trainer.id}:`, innerError);
            return {
              ...trainer.toJSON(),
              isConnected: false,
            };
          }
        })
    );

    res.status(200).json(trainersWithStatus);
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
