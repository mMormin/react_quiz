const { Quiz, User, Tag } = require("../models");

const profileController = {
  profilePage: (_, res) => {
    res.render("profile/profile");
  },

  async hundleProfileUpdate(req, res, next) {
    try {
      const emailParam = res.locals.user.email;
      let { firstname, lastname, email } = req.body;

      const user = await User.findOne({
        where: {
          email: emailParam,
        },
      });

      if (!user.length) {
        return res.render("profile/profile", { error: "failure" });
      }

      if (!firstname) {
        firstname = user.firstname;
      }
      if (!lastname) {
        lastname = user.lastname;
      }
      if (!email) {
        email = user.email;
      }

      user.set({
        firstname,
        lastname,
        email,
      });

      await user.save();

      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizzesPage(req, res, next) {
    try {
      const user_id = res.locals.user.id;

      const quizzes = await Quiz.findAll({
        where: {
          user_id,
        },
        include: ["tagsList"],
        order: [["created_at", "DESC"]],
      });

      if (!quizzes.length) {
        return res.render("profile/quizzesList", {
          quizzes,
          error: "quizAdd",
        });
      }

      return res.render("profile/quizzesList", { quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizPage(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = res.locals.user.id;

      const quiz = await Quiz.findOne({
        where: {
          id,
          user_id,
        },
        include: ["tagsList"],
      });

      const tags = await Tag.findAll();

      if (!quiz) {
        return res.render("status", { status: "404" });
      }

      return res.render("profile/oneQuiz", { quiz, tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  profileScorePage(req, res) {
    res.render("profile/score");
  },
};

module.exports = profileController;
