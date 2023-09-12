const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class Tag extends Model {}

Tag.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: dbInstance,
    modelName: "Tag",
    tableName: "tag",
  }
);

module.exports = Tag;
