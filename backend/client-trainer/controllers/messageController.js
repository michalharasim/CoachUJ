const Message = require('../models/Message');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const getMessages = async (req, res) => {
    const { senderID } = req.query;
    const userId = req.user_id;

    try {
        if (!senderID) {
            throw new ApiError(400, 'senderID is required');
    }
    const messages = await Message.findAll({
    where: {
        [Op.or]: [
            { senderID: senderID, receiverID: userId },
            { senderID: userId, receiverID: senderID }
        ]
    },
    order: [['createdAt', 'ASC']]
    });
    res.status(200).json(messages);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

const sendMessage = async (req, res) => {
  const { receiverID, content } = req.body;
  const userId = req.user_id;

  try {
    if (!receiverID || !content) {
      throw new ApiError(400, 'receiverID, and content are required');
    }

    const message = await Message.create({
      senderID: userId,
      receiverID,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = {
  getMessages,
  sendMessage
};