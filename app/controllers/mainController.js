const { Quiz, Tag } = require("../models/assoc");

const mainController = {
  async homePage(req, res, next) {
    try {
      const quizzesList = await Quiz.findAll({
        include: ["author", "tagsList"],
        order: [["created_at", "DESC"]],
      });

      if (!quizzesList) {
        res.redirect("/404");
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

      if (!quizById) {
        res.redirect("/404");
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

      if (!tags) {
        res.redirect("/404");
      }

      res.render("tags", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  errorPage: (req, res) => {
    res.render("404", { errorMessage: "404" });
  },
};

module.exports = mainController;
