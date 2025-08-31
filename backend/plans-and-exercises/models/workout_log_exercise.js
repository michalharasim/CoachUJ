const { DataTypes } = require("sequelize");
const sequelize = require('../db');

// Logi dla jednego ćwiczenia z jednego planu
const WorkoutLogExercise = sequelize.define("WorkoutLogExercise", {
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
    planExerciseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actualReps: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actualWeight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    breakTime: {
        type: DataTypes.STRING,
    },
});

module.exports = WorkoutLogExercise;