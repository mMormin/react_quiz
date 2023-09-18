const { Router } = require("express");

const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const adminMiddleware = require("./middlewares/memberMdw");
const memberMiddleware = require("./middlewares/memberMdw");

const router = Router();

// Default
router.get("/", mainController.homePage);
router.get("/quiz/:id", memberMiddleware, mainController.quizPage);
router.get("/tags", memberMiddleware, mainController.tagPage);

// Signup
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.addNewUser);

// Login
router.get("/login", userController.loginPage);
router.post("/login", userController.hundleLogin);
router.get("/logout", userController.hundleLogout);

// Profile
router.get("/profile/:email", memberMiddleware, userController.profilePage);

// Admin
router.get("/admin/users", adminMiddleware, adminController.userPage);
router.post("/admin/add/user", adminMiddleware, adminController.hundleUserAdd);
router.post("/admin/delete/users", adminMiddleware, adminController.hundleUserDelete);
router.get("/admin/quizzes", adminMiddleware, adminController.quizPage);
router.post("/admin/add/quiz", adminMiddleware, adminController.hundleQuizAdd);
router.post("/admin/delete/quizzes", adminMiddleware, adminController.hundleQuizDelete);
router.get("/admin/tags", adminMiddleware, adminController.tagPage);
router.post("/admin/add/tag", adminMiddleware, adminController.hundleTagAdd);
router.post("/admin/delete/tags", adminMiddleware, adminController.hundleTagDelete);

// Undefined path
router.use("*", mainController.errorPage);

module.exports = router;
