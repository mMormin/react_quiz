require("dotenv").config();
require("./test.js");
const sequelize = require("./app/db.js");
const port = process.env.PORT;

// Deps Imports
const express = require("express");
const router = require("./app/router");
const session = require("express-session");

// Express Init
const app = express();
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static("public"));

// Init for POST requests
app.use(express.urlencoded({ extended: true }));

// Session Init
app.use(
  session({
    secret: `Ceci n'est pas vraiment un mot de passe, c'est plus un salt pour encrypter le mot de passe !!!`,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Router Init
app.use(router);

const newConnexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("🗃️  Database connection ✅");
    app.listen(port, () => {
      console.log(`📡 Listening on localhost URL : http://localhost:${port}`);
    });
  } catch (error) {
    console.error("🗃️  Database connexion ❌ :", error);
  }
};

newConnexion();

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
