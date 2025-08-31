const { DataTypes } = require("sequelize");
const sequelize = require('../db');

// Logi dla jednego ćwiczenia z jednego planu
const ClientWorkoutLogExercise = sequelize.define("ClientWorkoutLog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // ID z ClientTrainingPlan
    workoutLogID: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

module.exports = ClientWorkoutLogExercise;