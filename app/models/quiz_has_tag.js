const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Quiz_has_tag extends Model {}

Quiz_has_tag.init(
  {
    quizId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
  },
  {
    sequelize: dbInstance,
    modelName: "Quiz_has_tag",
    tableName: "quiz_has_tag",
  }
);

module.exports = Quiz_has_tag;
