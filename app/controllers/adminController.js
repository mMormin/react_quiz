const Quiz = require("../models/quiz");
const Tag = require("../models/tag");
const User = require("../models/user");

const adminController = {
  async userPage(req, res, next) {
    try {
      const users = await User.findAll({
        include: ["quizzesList"],
        order: [["created_at", "DESC"]],
      });

      if (!users) {
        res.redirect("/404");
      }

      res.render("admin/users", { users });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizPage(req, res, next) {
    try {
      const quizzes = await Quiz.findAll({
        include: ["author", "tagsList"],
        order: [["created_at", "DESC"]],
      });

      if (!quizzes) {
        res.redirect("/404");
      }

      res.render("admin/quizzes", { quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async tagPage(req, res) {
    try {
      const tags = await Tag.findAll({
        order: [["created_at", "DESC"]],
        include: ["quizzesList"],
      });

      if (!tags) {
        res.redirect("/404");
      }

      res.render("admin/tags", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = adminController;
