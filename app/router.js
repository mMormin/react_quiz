const { Router } = require("express");
const quizController = require("./controllers/quizController");
const router = Router();

// Routes definition
router.get("/", quizController.homePage);
router.get("/quiz/:id", quizController.quizPage);
router.get("/tags", quizController.tagsPage);
router.use("*", quizController.errorPage);

module.exports = router;
