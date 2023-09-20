const { QueryTypes } = require("sequelize");
const sequelize = require("../db.js");

const Question = require("../models/question");
const Quiz = require("../models/quiz");
const User = require("../models/user");
const Tag = require("../models/tag");

const profileController = {
  profilePage: (req, res) => {
    res.render("profile/profile");
  },

  async profileQuizzesPage(req, res, next) {
    const loggedUserId = res.locals.user.id;

    try {
      const quizzes = await Quiz.findAll({
        where: {
          id: loggedUserId,
        },
      });

      if (!quizzes.length) {
        return res.render("profile/quizzesProfile", {
          quizzes,
          error: "quizAdd",
        });
      }

      res.render("profile/quizzesProfile", { quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizAddPage(req, res, next) {
    try {
      const tags = await Tag.findAll();
      res.render("profile/addQuizProfile", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizAdd(req, res, next) {
    let error;
    let { title, description } = req.body;
    const user_id = res.locals.user.id;

    try {
      // const questions = Question.findAll({
      //   where: {
      //     id: loggedUserId,
      //   },
      // });

      if (!title) {
        error = "quizTitle";
        return res.render("profile/addQuizProfile", { error });
      }

      const newQuiz = new Quiz({
        title,
        description,
        user_id,
      });

      await sequelize.query(
        `ALTER TABLE "answer" DROP CONSTRAINT answer_question_id_fkey`,
        { type: QueryTypes.RAW }
      );
      await newQuiz.save();
      await sequelize.query(
        `ALTER TABLE "answer" ADD CONSTRAINT answer_question_id_fkey FOREIGN KEY ("question_id") REFERENCES "answer"("id") ON DELETE SET NULL`,
        { type: QueryTypes.RAW }
      );

      res.render("profile/quizzesProfile");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  profileScorePage(req, res) {
    res.render("profile/scoreProfile");
  },

  async hundleProfileEdit(req, res, next) {
    const emailParam = res.locals.user.email;
    let { firstname, lastname, email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: emailParam,
        },
      });

      if (!user.length) {
        return res.render("/profile", { error: "failure" });
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

      res.redirect("/profile/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = profileController;
