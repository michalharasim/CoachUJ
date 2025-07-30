const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const Invitation = sequelize.define('Invitation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  inviterID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inviteeID: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Invitations',
  timestamps: false
});

module.exports = Invitation;
