require("dotenv").config();

const sequelize = require("./app/db.js");

const connexionCheck = async () => {
  try {
    await sequelize.authenticate();
    console.log("🗃️  Database connection ✅");
  } catch (error) {
    console.error("🗃️  Database connection ❌ :", error);
  }
};

connexionCheck();

/*
// Check the classes
const User = require("./app/models/user.js");
const user = new User({
//   id: 420, // Si non fourni : undefined = A_I, si fourni : ajout, si 0 ou egal à existant : New Error
  firstname: "Maxime",
  lastname: "MB",
  email: "maxime@mormin.boudot",
  lastname: "regardepasstpchapochapo",
});
console.log(user);
*/
