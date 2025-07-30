const ClientCoachLink = require('../models/ClientCoachLink');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const deleteConnection = async (req, res) => {
  const { userID } = req.params;

  try {
    const deletedCount = await ClientCoachLink.destroy({
      where: { clientID: userID }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Connection with the given ID not found.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getClientsOfTrainer = async (req, res) => {
  const { trainerId } = req.params;

  try {
    const clientLinks = await ClientCoachLink.findAll({
      where: { coachID: trainerId }
    });

    const clientIds = clientLinks.map(link => link.clientID);
    const clients = await User.findAll({
      where: {
        userID: clientIds,
        role: 'client'
      }
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  deleteConnection,
  getClientsOfTrainer
};