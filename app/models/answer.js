const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Answer extends Model {}

Answer.init(
  {
    text: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
  },
  {
    sequelize: dbInstance,
    modelName: "Answer",
    tableName: "answer",
  }
);

module.exports = Answer;
