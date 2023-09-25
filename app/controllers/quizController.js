const { QueryTypes } = require("sequelize");
const sequelize = require("../db.js");
const Quiz = require("../models/quiz.js");
const Tag = require("../models/tag.js");
const Level = require("../models/level.js");
const Question = require("../models/question.js");
const Answer = require("../models/answer.js");

const quizController = {
  async quizAddPage(req, res, next) {
    try {
      const tags = await Tag.findAll();
      res.render("profile/quizAdd", { tags });
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

      res.redirect("/profile/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizEdit(req, res, next) {
    const { id } = req.params;
    let { title, description, tag } = req.body;

    try {
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

      res.redirect(`/profile/quiz/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizDelete(req, res, next) {
    const { id } = req.params;
    const user_id = res.locals.user.id;

    try {
      const quiz = await Quiz.findOne({
        where: {
          id,
          user_id,
        },
      });

      if (!quiz) {
        return res.render("status", { status: "404" });
      }

      await quiz.destroy();

      res.redirect("/profile/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async questionsPage(req, res, next) {
    const { id } = req.params;
    const user_id = res.locals.user.id;

    try {
      const quiz = await Quiz.findOne({
        where: {
          id,
          user_id,
        },
        include: [
          {
            association: "questionsList",
            include: ["answersList", { association: "level" }],
          },
        ],
      });

      if (!quiz.questionsList) {
        return res.render(`profile/questions`, { quiz, error: "noQuestions" });
      }

      res.render(`profile/questions`, { quiz });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async questionAddPage(req, res, next) {
    const { id } = req.params;
    const user_id = res.locals.user.id;

    try {
      const quiz = await Quiz.findOne({
        where: {
          id,
          user_id,
        },
      });

      const levels = await Level.findAll();

      res.render("profile/questionAdd", { quiz, levels });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async questionEditPage(req, res, next) {
    const { id_qz, id_qt } = req.params;
    const user_id = res.locals.user.id;

    try {
      const quiz = await Quiz.findOne({
        where: {
          id: id_qz,
          user_id,
        },
        include: [
          {
            association: "questionsList",
            include: ["answersList", { association: "level" }],
          },
        ],
      });

      const answers = await Answer.findAll({
        where: {
          question_id: id_qt,
        },
        include: [
          {
            association: "validates",
          },
        ],
      });

      const question = await Question.findOne({
        where: {
          id: id_qt,
        },
        include: "level",
      });

      const levels = await Level.findAll();

      if (!quiz.questionsList.length) {
        return res.render("profile/questionEdit", {
          answers,
          quiz,
          question,
          levels,
          error: "failure",
        });
      }

      res.render("profile/questionEdit", {
        answers,
        quiz,
        question,
        levels,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuestionAdd(req, res, next) {
    const { description, anecdote, wiki, level, answers, goodAnswer } =
      req.body;
    const quiz_id = req.params.id;

    try {
      if (!description) {
        return res.render("profile/questionAdd", {
          error: "questionTitle",
        });
      }

      if (!answers) {
        return res.render("profile/questionAdd", {
          error: "answers",
        });
      }

      const newQuestion = await Question.create({
        description,
        anecdote,
        wiki,
        quiz_id,
        level_id: level,
      });

      const newGoodAnswer = await Answer.create({
        description: goodAnswer,
      });

      newQuestion.answer_id = newGoodAnswer.id;
      await newQuestion.save();

      newGoodAnswer.question_id = newQuestion.id;
      await newGoodAnswer.save();

      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        await Answer.create({
          description: answer,
          question_id: newQuestion.id,
        });
      }

      res.redirect(`/profile/quiz/${quiz_id}/questions`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleAnswerDelete(req, res, next) {
    const { id_qz, id_qt } = req.params;

    try {
      const answer = await Answer.findByPk({
        where: {
          question_id: id_qt,
        },
      });

      if (!answer) {
        return res.render(`/profile/quiz/${id_qz}/question/${id_qt}/edit`, {
          error: "failure",
        });
      }

      await answer.destroy();

      res.redirect(`/profile/quiz/${id_qz}/question/${id_qt}/edit`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = quizController;
