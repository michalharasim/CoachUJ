const sequelize = require('../db');
const {DataTypes} = require("sequelize");

const ClientTrainingPlan = sequelize.define("ClientTrainingPlan", {
    planID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    clientID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
});

module.exports = ClientTrainingPlan;