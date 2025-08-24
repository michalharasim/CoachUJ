const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const ClientWorkoutLog = sequelize.define("ClientWorkoutLog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    actualSteps: {
        type: DataTypes.INTEGER,
    },
    actualReps: {
        type: DataTypes.STRING,
    },
    breakTime: {
        type: DataTypes.INTEGER,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    actualWeight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ClientWorkoutLog;