require("dotenv").config();
const sequelize = require("./app/db.js");
/*
const Answer = require("./app/models/answer");
const Level = require("./app/models/level")
const Question = require("./app/models/question");
const Quiz_has_tag = require("./app/models/quiz_has_tag");
const Quiz = require("./app/models/quiz");
const Tag = require("./app/models/tag");
const User = require("./app/models/user");
*/

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
/*

/*
// To check Models (require the associated Model)
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
