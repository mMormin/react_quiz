const { Router } = require("express");

const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");

const router = Router();

// Default
router.get("/", mainController.homePage);
router.get("/quiz/:id", mainController.quizPage);
router.get("/tags", mainController.tagsPage);

// Signup
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.addNewUser);

// Login
router.get("/login", userController.loginPage);
router.post("/login", userController.hundleLogin);

// Error Page
router.use("*", mainController.errorPage);

module.exports = router;
