const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");
const Question = require("./question.js");

class Answer extends Model {}

Answer.init(
  {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    questionId: DataTypes.INTEGER,
  },
  {
    sequelize: dbInstance,
    modelName: "Answer",
    tableName: "answer",
  }
);

Answer.belongsTo(Question, {
  foreignKey: "questionId",
});

module.exports = Answer;
