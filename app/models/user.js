const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      defaultValue: `Michelle#${Math.floor(Math.random() * 100)}`,
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: "[ADMIN]",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/i, // 8 chars containing at least 1 uppC && 1 lowC && 1 spec from (#?!@$%^*-) && 1 digit
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member",
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstname} ${this.lastname}`;
      },
      set(value) {
        throw new Error(
          "Error while the creation of _hoodyFullname under the hood."
        );
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
  }
);

module.exports = User;
