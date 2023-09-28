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

// MAIN ROUTES
router.get("/", mainController.homePage);
router.get("/quizzes/:id", memberMiddleware, mainController.quizPage);
router.get("/tags", memberMiddleware, mainController.tagPage);

// SIGNUP ROUTES
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.hundleNewUser);

// LOGIN ROUTES
router.get("/login", userController.loginPage);
router.get("/logout", userController.hundleLogout);
router.post("/login", userController.hundleLogin);

// PROFILE ROUTES
// Main
router.get("/profile", memberMiddleware, profileController.profilePage);
router.get("/profile/quizs", memberMiddleware, profileController.quizzesPage);
router.get("/profile/quizs/:id", memberMiddleware, profileController.quizPage);
router.get("/profile/score", memberMiddleware, profileController.profileScorePage);
router.post("/profile", memberMiddleware, profileController.hundleProfileUpdate);
// Quiz
router.get("/profile/quiz", memberMiddleware, quizController.newQuizPage);
router.post("/profile/quizs", memberMiddleware, quizController.hundleNewQuiz);
router.post("/profile/quizs/:id", memberMiddleware, quizController.hundleQuizUpdate);
router.post("/profile/quizs/:id/delete", memberMiddleware, quizController.hundleQuizDelete);
// Questions
router.get("/profile/quizs/:quiz_id/questions", memberMiddleware, questionController.questionsPage);
router.get("/profile/quizs/:quiz_id/questions/add", memberMiddleware, questionController.newQuestionPage);
router.get("/profile/quizs/:quiz_id/questions/:question_id", memberMiddleware, questionController.questionPage);
router.post("/profile/quizs/:quiz_id/questions", memberMiddleware, questionController.hundleNewQuestion);
router.post("/profile/quizs/:quiz_id/questions/:question_id/delete", memberMiddleware, questionController.hundleAnswerDelete);


// ADMIN ROUTES
router.get("/admin/users", adminMiddleware, adminController.userPage);
router.post("/admin/users", adminMiddleware, adminController.hundleUserAdd);
router.post("/admin/users/:id/edit", adminMiddleware, adminController.hundleUserEdit);
router.post("/admin/users/:id/edit/delete", adminMiddleware, adminController.hundleUserDelete);
router.get("/admin/quizs", adminMiddleware, adminController.quizPage);
router.post("/admin/quizs/add", adminMiddleware, adminController.hundleQuizAdd);
router.post("/admin/quizs/:id/edit", adminMiddleware, adminController.hundleQuizEdit);
router.post("/admin/quizs/:id/delete", adminMiddleware, adminController.hundleQuizDelete);
router.get("/admin/tags", adminMiddleware, adminController.tagPage);
router.post("/admin/tags/add", adminMiddleware, adminController.hundleTagAdd);
router.post("/admin/tags/:id/edit", adminMiddleware, adminController.hundleTagEdit);
router.post("/admin/tags/:id/delete", adminMiddleware, adminController.hundleTagDelete);

// Undefined path
router.use("*", mainController.errorPage);

module.exports = router;
