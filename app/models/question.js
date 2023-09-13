const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Question extends Model {}

Question.init(
  {
    text: {
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
    sequelize: dbInstance,
    modelName: "Question",
    tableName: "question",
  }
);

module.exports = Question;
