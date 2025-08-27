const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ExerciseCategory = sequelize.define("ExerciseCategory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = ExerciseCategory;
