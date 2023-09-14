const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Level extends Model {}

Level.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Level",
    tableName: "level",
  }
);

module.exports = Level;
