const { Router } = require("express");

const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const profileController = require("./controllers/profileController");
const quizController = require("./controllers/quizController");
const questionController = require("./controllers/questionController");
const adminMiddleware = require("./middlewares/memberMdw");
const memberMiddleware = require("./middlewares/memberMdw");

const router = Router();

// Default
router.get("/", mainController.homePage);
router.get("/quizzes/:id", memberMiddleware, mainController.quizPage);
router.get("/tags", memberMiddleware, mainController.tagPage);

// Signup
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.hundleNewUser);

// Login
router.get("/login", userController.loginPage);
router.get("/logout", userController.hundleLogout);
router.post("/login", userController.hundleLogin);

// Profile
router.get("/profile", memberMiddleware, profileController.profilePage);
router.get("/profile/quizs", memberMiddleware, profileController.quizzesPage);
router.get("/profile/quizs/:id", memberMiddleware, profileController.quizPage);
router.get("/profile/score", memberMiddleware, profileController.profileScorePage);
router.post("/profile", memberMiddleware, profileController.hundleProfileUpdate);

router.get("/profile/quiz", memberMiddleware, quizController.newQuizPage);
router.post("/profile/quizs", memberMiddleware, quizController.hundleNewQuiz);
router.post("/profile/quizs/:id", memberMiddleware, quizController.hundleQuizUpdate);
router.post("/profile/quizs/:id/delete", memberMiddleware, quizController.hundleQuizDelete);

// Profile Questions
router.get("/profile/quizs/:quiz_id/questions", memberMiddleware, questionController.questionsPage);
router.get("/profile/quizs/:quiz_id/questions/add", memberMiddleware, questionController.newQuestionPage);
router.get("/profile/quizs/:quiz_id/questions/:question_id", memberMiddleware, questionController.questionPage);
router.post("/profile/quizs/:quiz_id/questions", memberMiddleware, questionController.hundleNewQuestion);
router.post("/profile/quizs/:quiz_id/questions/:question_id/delete", memberMiddleware, questionController.hundleAnswerDelete);


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
