const dbInstance = require("../db.js");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize: dbInstance,
    modelName: "User",
    tableName: "user",
  }
);



module.exports = User;
