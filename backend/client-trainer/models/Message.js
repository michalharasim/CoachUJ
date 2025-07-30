const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  senderID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  receiverID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'Messages',
  timestamps: false
});

module.exports = Message;
