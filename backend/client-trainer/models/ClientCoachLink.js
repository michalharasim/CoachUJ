const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const ClientCoachLink = sequelize.define('ClientCoachLink', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  clientID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coachID: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'ClientCoachLinks',
  timestamps: false
});

module.exports = ClientCoachLink;
