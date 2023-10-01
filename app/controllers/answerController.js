const { Answer } = require("../models");

const answerController = {
  async handleAnswerDelete(req, res, next) {
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

module.exports = answerController;
