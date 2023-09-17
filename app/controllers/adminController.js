const Quiz = require("../models/quiz");
const Tag = require("../models/tag");
const User = require("../models/user");

const adminController = {
  async userPage(req, res, next) {
    const modalValues = { name: "User", path: "/users/delete", type: "email" };

    try {
      const users = await User.findAll({
        include: ["quizzesList"],
        order: [["created_at", "DESC"]],
      });

      if (!users) {
        res.redirect("/404");
      }

      res.render("admin/users", { users, modalValues });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleUserDelete(req, res, next) {
    const { email } = req.body;
    try {
      const user = await User.destroy({
        where: {
          email,
        },
      });

      if (!user) {
        res.redirect("/404");
      }

      res.redirect("/admin/users");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizPage(req, res, next) {
    const modalValues = { name: "Quiz", path: "/quizzes/delete", type: "id" };

    try {
      const quizzes = await Quiz.findAll({
        include: ["author", "tagsList"],
        order: [["created_at", "DESC"]],
      });

      if (!quizzes) {
        res.redirect("/404");
      }

      res.render("admin/quizzes", { quizzes, modalValues });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizDelete(req, res, next) {
    const { id } = req.body;

    try {
      const quiz = await Quiz.truncate({
        where: {
          id,
        },
      });

      if (!quiz) {
        console.log(id)
        res.redirect("/404");
      }

      res.redirect("/admin/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async tagPage(req, res) {
    const modalValues = { name: "Tag", path: "/tags/delete", type: "id" };

    try {
      const tags = await Tag.findAll({
        order: [["created_at", "DESC"]],
        include: ["quizzesList"],
      });

      if (!tags) {
        res.redirect("/404");
      }

      res.render("admin/tags", { tags, modalValues });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleTagDelete(req, res, next) {
    const { id } = req.body;

    try {
      const tag = await Tag.destroy({
        where: {
          id,
        },
      });

      if (!tag) {
        res.redirect("/404");
      }

      res.redirect("/admin/tags");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = adminController;
