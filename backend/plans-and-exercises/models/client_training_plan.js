const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ClientTrainingPlan = sequelize.define("ClientTrainingPlan");
    return ClientTrainingPlan;
};