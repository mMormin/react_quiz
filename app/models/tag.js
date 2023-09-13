const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: dbInstance,
    modelName: "Tag",
    tableName: "tag",
  }
);

module.exports = Tag;
