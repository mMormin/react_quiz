const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

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

module.exports = Answer;
