const sequelize = require('../db');
const {DataTypes} = require("sequelize");

// W momencie wysłania planu do klienta przez trenera tworzy się rekord w tabeli
const WorkoutLog = sequelize.define("ClientTrainingPlan", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    planID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    clientID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = ClientTrainingPlan;