const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
        // TODO: remove it when coach table is implemented, move to index.js
        coachID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return TrainingPlan;
};