require("dotenv").config();
const sequelize = require("./app/db.js");
require("./test.js")

const dbConnexionCheck = async () => {
  try {
    await sequelize.authenticate();
    console.log("🗃️  Database connection ✅");
  } catch (error) {
    console.error("🗃️  Database connexion ❌ :", error);
  }
};
dbConnexionCheck();

/*
// To force tables creation
const tablesCreation = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("🗃️  Models synchronization ✅");
  } catch (error) {
    console.error("🗃️  Models synchronization ❌ :", error);
  }
};
tablesCreation();
*/
