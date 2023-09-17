const { Router } = require("express");

const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");

const router = Router();

// Default
router.get("/", mainController.homePage);
router.get("/quiz/:id", mainController.quizPage);
router.get("/tags", mainController.tagPage);

// Signup
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.addNewUser);

// Login
router.get("/login", userController.loginPage);
router.post("/login", userController.hundleLogin);
router.get("/logout", userController.hundleLogout);

// Profile
router.get("/profile/:email", userController.profilePage);

// Admin
router.get("/admin/users", adminController.userPage);
router.post("/admin/add/user", adminController.hundleUserAdd);
router.post("/admin/delete/users", adminController.hundleUserDelete);
router.get("/admin/quizzes", adminController.quizPage);
router.post("/admin/add/quiz", adminController.hundleQuizAdd);
router.post("/admin/delete/quizzes", adminController.hundleQuizDelete);
router.get("/admin/tags", adminController.tagPage);
router.post("/admin/add/tag", adminController.hundleTagAdd);
router.post("/admin/delete/tags", adminController.hundleTagDelete);

// Error Page
router.use("*", mainController.errorPage);

module.exports = router;
