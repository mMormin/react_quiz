const { Router } = require("express");

const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const profileController = require("./controllers/profileController");
const adminMiddleware = require("./middlewares/memberMdw");
const memberMiddleware = require("./middlewares/memberMdw");

const router = Router();

// Default
router.get("/", mainController.homePage);
router.get("/quiz/:id", memberMiddleware, mainController.quizPage);
router.get("/tags", memberMiddleware, mainController.tagPage);

// Signup
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.hundleNewUser);

// Login
router.get("/login", userController.loginPage);
router.post("/login", userController.hundleLogin);
router.get("/logout", userController.hundleLogout);

// Profile
router.get("/profile", memberMiddleware, profileController.profilePage);
router.post("/profile/edit", memberMiddleware, profileController.hundleProfileEdit);
router.get("/profile/quizzes", memberMiddleware, profileController.profileQuizzesPage);
router.get("/profile/quizzes/add", memberMiddleware, profileController.quizAddPage);
router.post("/profile/quiz/add", memberMiddleware, profileController.hundleQuizAdd);
router.get("/profile/score", memberMiddleware, profileController.profileScorePage);

// Admin
router.get("/admin/users", adminMiddleware, adminController.userPage);
router.post("/admin/add/user", adminMiddleware, adminController.hundleUserAdd);
router.post("/admin/edit/user/:id", adminMiddleware, adminController.hundleUserEdit);
router.post("/admin/delete/user/:id", adminMiddleware, adminController.hundleUserDelete);
router.get("/admin/quizzes", adminMiddleware, adminController.quizPage);
router.post("/admin/add/quiz", adminMiddleware, adminController.hundleQuizAdd);
router.post("/admin/edit/quiz/:id", adminMiddleware, adminController.hundleQuizEdit);
router.post("/admin/delete/quiz/:id", adminMiddleware, adminController.hundleQuizDelete);
router.get("/admin/tags", adminMiddleware, adminController.tagPage);
router.post("/admin/add/tag", adminMiddleware, adminController.hundleTagAdd);
router.post("/admin/edit/tag/:id", adminMiddleware, adminController.hundleTagEdit);
router.post("/admin/delete/tag/:id", adminMiddleware, adminController.hundleTagDelete);

// Undefined path
router.use("*", mainController.errorPage);

module.exports = router;
