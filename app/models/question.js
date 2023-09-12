const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Question extends Model {}

Question.init(
  {
    text: DataTypes.STRING,
    tip: DataTypes.STRING,
    levelId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
  },
  {
    sequelize: dbInstance,
    modelName: "Question",
    tableName: "question",
  }
);

module.exports = Question;
