const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Quiz extends Model {}

Quiz.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Quiz",
    tableName: "quiz",
  }
);

module.exports = Quiz;
