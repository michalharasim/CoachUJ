const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const TrainingPlan = sequelize.define("TrainingPlan", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coachID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = TrainingPlan;