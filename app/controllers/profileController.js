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
    const user_id = res.locals.user.id;

    try {
      const quizzes = await Quiz.findAll({
        where: {
          user_id,
        },
        include: ["tagsList"],
        order: [["created_at", "DESC"]],
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
    const { title, description, tag } = req.body;
    const user_id = res.locals.user.id;

    try {
      if (!title) {
        const tags = await Tag.findAll();
        return res.render("profile/addQuizProfile", {
          tags,
          error: "quizTitle",
        });
      }

      // await Quiz.create(
      //   {
      //     title,
      //     description,
      //     user_id,
      //     quiz_has_tag: {quiz_id: this.id, tag_id: tag},
      //   },
      //   {
      //     include: "quiz_has_tag",
      //   }
      // );

      const newQuiz = new Quiz({
        title,
        description,
        user_id,
      });

      await newQuiz.save();
      if (Array.isArray(tag)) {
        for (let i = 0; i < tag.length; ++i) {
          const oneTag = tag[i];
          await sequelize.query(
            `INSERT INTO quiz_has_tag (quiz_id, tag_id) VALUES (${newQuiz.id}, ${oneTag});`,
            { type: QueryTypes.INSERT }
          );
        }
      } else {
        await sequelize.query(
          `INSERT INTO quiz_has_tag (quiz_id, tag_id) VALUES (${newQuiz.id}, ${tag});`,
          { type: QueryTypes.INSERT }
        );
      }

      res.redirect("/profile/quizzes");
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
