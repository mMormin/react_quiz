const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Level extends Model {}

Level.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: dbInstance,
    modelName: "Level",
    tableName: "level",
  }
);

module.exports = Level;
