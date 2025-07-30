const Message = require('../models/Message');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const getMessages = async (req, res) => {
    const { senderID, receiverID } = req.query;

    try {
        if (!senderID || !receiverID) {
            throw new ApiError(400, 'Both senderID and receiverID are required');
    }
    const messages = await Message.findAll({
    where: {
        [Op.or]: [
            { senderID: senderID, receiverID: receiverID },
            { senderID: receiverID, receiverID: senderID }
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
  const { senderID, receiverID, content } = req.body;

  try {
    if (!senderID || !receiverID || !content) {
      throw new ApiError(400, 'senderID, receiverID, and content are required');
    }

    const message = await Message.create({
      senderID,
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