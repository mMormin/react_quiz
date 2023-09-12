const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");
const Level = require("./level");
const Quiz = require("./quiz.js");
const Answer = require("./answer.js");


class Question extends Model {}

Question.init(
  {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
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

Question.hasOne(Level, {
  foreignKey: "levelId",
});
Question.hasOne(Quiz, {
  foreignKey: "quizId",
});
Question.hasOne(Answer, {
  foreignKey: "answerId",
});

module.exports = Question;
