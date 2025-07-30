const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  userID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  givenName: {
    type: DataTypes.STRING
  },
  surname: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  picture: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  role: {
    type: DataTypes.ENUM('client', 'trainer'),
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User;
