const { Quiz, Tag } = require("../models/assoc");

const mainController = {
  async homePage(req, res, next) {
    try {
      const quizzesList = await Quiz.findAll({
        include: ["author", "tagsList"],
        order: [["created_at", "DESC"]],
      });

      if (!quizzesList.length) {
        const error = "noQuizzes";
        return res.render("home", { quizzes, error });
      }

      res.render("home", { quizzes: quizzesList });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizPage(req, res, next) {
    const { id } = req.params;

    try {
      const quizById = await Quiz.findByPk(id, {
        include: [
          "author",
          "tagsList",
          {
            association: "questionsList",
            include: ["answersList", { association: "level" }],
          },
        ],
      });

      if (!quizById.length) {
        return res.status(404).render("status", { status: "404" });
      }

      res.render("quiz", { quiz: quizById });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async tagPage(req, res, next) {
    try {
      const tags = await Tag.findAll({
        include: ["quizzesList"],
      });

      if (!tags.length) {
        const error = "noTags";
        res.render("tags", { tags, error });
      }

      res.render("tags", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  errorPage: (req, res) => {
    res.status(404).render("status", { status: "404" });
  },
};

module.exports = mainController;
