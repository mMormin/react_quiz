const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");
const User = require("./user");
const Tag = require("./tag");
const Quiz_has_tag = require("./quiz_has_tag");

class Quiz extends Model {}

Quiz.init(
  {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize: dbInstance,
    modelName: "Quiz",
    tableName: "quiz",
  }
);

Quiz.belongsTo(User, {
  foreignKey: "userId",
});

Quiz.belongsToMany(Tag, {through: Quiz_has_tag})

module.exports = Quiz;
