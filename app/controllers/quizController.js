const { Quiz, Tag } = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db.js");

const quizController = {
  async newQuizPage(_, res, next) {
    try {
      const tags = await Tag.findAll();

      res.render("profile/quizAdd", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleNewQuiz(req, res, next) {
    try {
      const { title, description, tag } = req.body;
      const user_id = res.locals.user.id;

      const tags = await Tag.findAll();

      if (!title) {
        return res.render("profile/quizAdd", {
          tags,
          error: "quizTitle",
        });
      }

      if (!tag) {
        return res.render("profile/quizAdd", {
          tags,
          error: "quizTag",
        });
      }

      const newQuiz = new Quiz({
        title,
        description,
        user_id,
      });

      await newQuiz.save();

      for (const oneTag of tag) {
        await sequelize.query(
          `INSERT INTO quiz_has_tag (quiz_id, tag_id) VALUES (${newQuiz.id}, ${oneTag});`,
          {
            type: QueryTypes.INSERT,
          }
        );
      }

      return res.redirect("/profile/quizs");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizUpdate(req, res, next) {
    try {
      const { id } = req.params;
      let { title, description, tag } = req.body;
      const quiz = await Quiz.findByPk(id);

      if (!quiz) {
        return res.render(`profile/quiz`, { error: "failure" });
      }

      if (!title) {
        title = quiz.title;
      }

      if (!description) {
        description = quiz.description;
      }

      if (tag) {
        await sequelize.transaction(async (t) => {
          await sequelize.query(
            `DELETE FROM quiz_has_tag WHERE quiz_id = ${quiz.id}`,
            {
              type: QueryTypes.DELETE,
              transaction: t,
            }
          );

          for (const oneTag of tag) {
            await sequelize.query(
              `INSERT INTO quiz_has_tag (quiz_id, tag_id) VALUES (${quiz.id}, ${oneTag})`,
              {
                type: QueryTypes.INSERT,
                transaction: t,
              }
            );
          }
        });
      }

      quiz.set({
        title,
        description,
      });

      await quiz.save();

      return res.redirect(`/profile/quizs/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizDelete(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = res.locals.user.id;

      const quiz = await Quiz.findOne({
        where: {
          id,
          user_id,
        },
      });

      if (!quiz) {
        return res.render("status", { status: "404" });
      }

      await sequelize.query(
        `DELETE FROM quiz_has_tag WHERE quiz_id = ${quiz.id}`,
        {
          type: QueryTypes.DELETE,
        }
      );

      await quiz.destroy();

      return res.redirect("/profile/quizs");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = quizController;
