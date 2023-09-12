const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Quiz extends Model {}

Quiz.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize: dbInstance,
    modelName: "Quiz",
    tableName: "quiz",
  }
);

module.exports = Quiz;
