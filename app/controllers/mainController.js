const { Tag, Quiz } = require("../models");

const mainController = {
  async homePage(_, res, next) {
    try {
      const quizzes = await Quiz.findAll({
        include: ["author", "tagsList"],
        order: [["created_at", "DESC"]],
      });

      if (!quizzes.length) {
        const error = "noQuizzes";
        return res.render("home", { quizzes, error });
      }

      return res.render("home", { quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizPage(req, res, next) {
    try {
      const { id } = req.params;

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

      if (!quizById) {
        return res.status(404).render("status", { status: "404" });
      }

      return res.render("quiz", { quiz: quizById });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async tagPage(_, res, next) {
    try {
      const tags = await Tag.findAll({
        include: ["quizzesList"],
      });

      if (!tags.length) {
        const error = "noTags";
        return res.render("tags", { tags, error });
      }

      return res.render("tags", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  errorPage: (_, res) => {
    res.status(404).render("status", { status: "404" });
  },
};

module.exports = mainController;
