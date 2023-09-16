const { Sequelize } = require("sequelize");

const sequelizeConnect = new Sequelize({
  dialect: "postgres",
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    client_encoding: "UTF8",
  },
});

module.exports = sequelizeConnect;
