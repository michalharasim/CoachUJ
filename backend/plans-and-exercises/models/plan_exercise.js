const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PlanExercise = sequelize.define("PlanExercise", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // planID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // exerciseID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
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
    return PlanExercise;
};