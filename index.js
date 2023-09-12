const dotenv = require("dotenv");
const sequelize = require("./app/db.js");
const User = require("./app/models/user.js");

dotenv.config();
const connexionCheck = async () => {
  try {
    await sequelize.authenticate();
    console.log("🗃️  Database connection ✅");
  } catch (error) {
    console.error("🗃️  Database connection ❌ :", error);
  }
};
connexionCheck();

// Check the classes
/*
const userCheck = async () => {
  const newUser = await User.create({
    // id: 420, // Si non fourni : undefined = A_I, si fourni : ajout, si 0 ou egal à existant : New Error
    firstname: "Maxime",
    lastname: "MB",
    email: "maxime@mormin.boudot",
    password: "regardepasstpchapochapo",
  });
  console.log(`Added user Id: ${newUser.id}`);

  const getUsersList = await User.findAll({ raw: true });
  console.log(getUsersList);

  const getUserThree = await User.findByPk(3);
  console.log(getUserThree.firstname);
};
userCheck();
*/