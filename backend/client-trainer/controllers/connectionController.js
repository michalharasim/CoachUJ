const ClientCoachLink = require('../models/ClientCoachLink');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const {Op} = require("sequelize");

const deleteConnection = async (req, res) => {
  const requestingUserId = req.user_id;
  const targetUserId = req.params.userID;
  try {
    const deletedCount = await ClientCoachLink.destroy({
      where: {
        clientID: targetUserId,
        coachID: requestingUserId
      }
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

const getConnectedUsers = async (req, res) => {
  const userID = req.user_id;
  const isCoach = req.role === 'trainer';

  try {
    let userLinks;
    if (isCoach){
      userLinks = await ClientCoachLink.findAll({
        where: { coachID: userID }
      });
    }else{
      userLinks = await ClientCoachLink.findAll({
        where: { clientID: userID }
      });

    }
    const userIds = userLinks.map(link =>
        isCoach ? link.clientID : link.coachID
    );
    const users = await User.findAll({
      where: {
        userID: {
          [Op.in]: userIds
        }
      }
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  deleteConnection,
  getConnectedUsers,
};