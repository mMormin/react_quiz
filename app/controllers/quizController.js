const mapper = require("../mapper");

const quizController = {
  homePage: async (req, res, next) => {
    try {
      const quizzesList = await mapper.getQuizzesList();

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

  quizPage: async (req, res, next) => {
    const { id } = req.params;
    try {
      const quizById = await mapper.getQuizById(id);

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

  tagsPage: async (req, res, next) => {
    try {
      const tags = await mapper.getTagsList();

      if (!quizzesList) {
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

module.exports = quizController;
