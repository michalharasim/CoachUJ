const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const PlanExercise = sequelize.define("PlanExercise", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    planID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    exerciseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    setCount: {
        type: DataTypes.INTEGER,
    },
    repCount: {
        type: DataTypes.STRING,
    },
    breakTime: {
        type: DataTypes.INTEGER,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = PlanExercise;