const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Exercise = sequelize.define("Exercise", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        picture: {
            type: DataTypes.TEXT,
        },
        coachID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return Exercise;
};