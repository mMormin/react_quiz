const { Router } = require("express");

const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const profileController = require("./controllers/profileController");
const quizController = require("./controllers/quizController");
const questionController = require("./controllers/questionController");
const answerController = require("./controllers/answerController");
const adminMiddleware = require("./middlewares/memberMdw");
const memberMiddleware = require("./middlewares/memberMdw");

const router = Router();

// MAIN ROUTES
router.get("/", mainController.homePage);
router.get("/quizzes/:id", memberMiddleware, mainController.quizPage);
router.get("/tags", memberMiddleware, mainController.tagPage);

// SIGNUP ROUTES
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.handleNewUser);

// LOGIN ROUTES
router.get("/login", userController.loginPage);
router.get("/logout", userController.handleLogout);
router.post("/login", userController.handleLogin);

// PROFILE ROUTES
// Main
router.get("/profile", memberMiddleware, profileController.profilePage);
router.get("/profile/quizs", memberMiddleware, profileController.quizzesPage);
router.get("/profile/quizs/:id", memberMiddleware, profileController.quizPage);
router.get("/profile/score", memberMiddleware, profileController.profileScorePage);
router.post("/profile", memberMiddleware, profileController.handleProfileUpdate);
// Quiz
router.get("/profile/quiz", memberMiddleware, quizController.newQuizPage);
router.post("/profile/quizs", memberMiddleware, quizController.handleNewQuiz);
router.post("/profile/quizs/:id", memberMiddleware, quizController.handleQuizUpdate);
router.post("/profile/quizs/:id/delete", memberMiddleware, quizController.handleQuizDelete);
// Questions
router.get("/profile/quizs/:quiz_id/questions", memberMiddleware, questionController.questionsPage);
router.get("/profile/quizs/:quiz_id/questions/add", memberMiddleware, questionController.newQuestionPage);
router.get("/profile/quizs/:quiz_id/questions/:question_id", memberMiddleware, questionController.questionPage);
router.post("/profile/quizs/:quiz_id/questions", memberMiddleware, questionController.handleNewQuestion);
//Answers
router.post("/profile/quizs/:quiz_id/questions/:question_id/answers/delete", memberMiddleware, answerController.handleAnswerDelete);


// ADMIN ROUTES
router.get("/admin/users", adminMiddleware, adminController.userPage);
router.post("/admin/users", adminMiddleware, adminController.handleUserAdd);
router.post("/admin/users/:id/edit", adminMiddleware, adminController.handleUserEdit);
router.post("/admin/users/:id/edit/delete", adminMiddleware, adminController.handleUserDelete);
router.get("/admin/quizs", adminMiddleware, adminController.quizPage);
router.post("/admin/quizs/add", adminMiddleware, adminController.handleQuizAdd);
router.post("/admin/quizs/:id/edit", adminMiddleware, adminController.handleQuizEdit);
router.post("/admin/quizs/:id/delete", adminMiddleware, adminController.handleQuizDelete);
router.get("/admin/tags", adminMiddleware, adminController.tagPage);
router.post("/admin/tags/add", adminMiddleware, adminController.handleTagAdd);
router.post("/admin/tags/:id/edit", adminMiddleware, adminController.handleTagEdit);
router.post("/admin/tags/:id/delete", adminMiddleware, adminController.handleTagDelete);

// Undefined path
router.use("*", mainController.errorPage);

module.exports = router;
