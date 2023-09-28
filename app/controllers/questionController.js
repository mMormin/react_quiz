const { Quiz, Level, Question, Answer } = require("../models");

const quizController = {
  async questionsPage(req, res, next) {
    try {
      const { quiz_id } = req.params;
      const user_id = res.locals.user.id;

      const quiz = await Quiz.findOne({
        where: {
          id: quiz_id,
          user_id,
        },
        include: [
          {
            association: "questionsList",
            include: ["answersList", { association: "level" }],
          },
        ],
      });

      if (!quiz) {
        return res.render("status", { status: "404" });
      }

      if (!quiz.questionsList) {
        return res.render("profile/questionList", { quiz, error: "noQuestions" });
      }

      return res.render("profile/questionsList", { quiz });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async newQuestionPage(req, res, next) {
    try {
      const { quiz_id } = req.params;
      const user_id = res.locals.user.id;

      const quiz = await Quiz.findOne({
        where: {
          id: quiz_id,
          user_id,
        },
      });

      if (!quiz) {
        return res.render("profile/questionAdd", {
          quiz,
          levels,
          error: "failure",
        });
      }

      const levels = await Level.findAll();

      return res.render("profile/questionAdd", { quiz, levels });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async questionPage(req, res, next) {
    try {
      const { quiz_id, question_id } = req.params;
      const user_id = res.locals.user.id;

      const quiz = await Quiz.findOne({
        where: {
          id: quiz_id,
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
          question_id,
        },
        include: [
          {
            association: "validates",
          },
        ],
      });

      const question = await Question.findOne({
        where: {
          id: question_id,
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

      return res.render("profile/questionEdit", {
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

  async hundleNewQuestion(req, res, next) {
    try {
      const { description, anecdote, wiki, level, answers, goodAnswer } =
        req.body;
      const { quiz_id } = req.params;
      const user_id = res.locals.user.id;

      const quiz = await Quiz.findOne({ where: { id: quiz_id, user_id } });

      const levels = await Level.findAll();

      if (!description) {
        return res.render("profile/questionAdd", {
          error: "questionTitle",
          quiz,
          levels
        });
      }

      if (!answers) {
        return res.render("profile/questionAdd", {
          error: "answers",
          quiz,
          levels
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

      return res.redirect(`/profile/quizs/${quiz_id}/questions`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleAnswerDelete(req, res, next) {
    const { quiz_id, question_id } = req.params;

    try {
      const answer = await Answer.findByPk({
        where: {
          question_id,
        },
      });

      if (!answer) {
        return res.render(`profile/questionEdit`, {
          error: "failure",
        });
      }

      await answer.destroy();

      return res.redirect(`/profile/quizs/${quiz_id}/questions/${question_id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = quizController;
