const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Level extends Model {}

Level.init(
  {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: dbInstance,
    modelName: "Level",
    tableName: "level",
  }
);

module.exports = Level;
