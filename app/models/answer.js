const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Answer extends Model {}

Answer.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  },
  {
    sequelize,
    modelName: "Answer",
    tableName: "answer",
  }
);

module.exports = Answer;
