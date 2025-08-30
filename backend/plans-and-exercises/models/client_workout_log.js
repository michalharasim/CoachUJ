const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const ClientWorkoutLog = sequelize.define("ClientWorkoutLog", {
    planID: {
        type: DataTypes.INTEGER,
        required: true,
    },
    clientID: {
        type: DataTypes.INTEGER,
        required: true,
    },
    actualReps: {
        type: DataTypes.STRING,
    },
    actualWeight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    breakTime: {
        type: DataTypes.INTEGER,
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

module.exports = ClientWorkoutLog;