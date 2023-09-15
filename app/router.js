const { Router } = require("express");
const mainController = require("./controllers/mainController");
const router = Router();

// Routes definition
router.get("/", mainController.homePage);
router.get("/quiz/:id", mainController.quizPage);
router.get("/tags", mainController.tagsPage);
router.use("*", mainController.errorPage);

module.exports = router;
