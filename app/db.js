require("dotenv/config");
const { Sequelize } = require("sequelize");

const sequelizeConnect = new Sequelize({
  dialect: "postgres",
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelizeConnect;
