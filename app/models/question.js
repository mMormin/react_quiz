const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Question extends Model {}

Question.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    anecdote: DataTypes.STRING,
    wiki: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "question",
  }
);

module.exports = Question;
