const CoreModel = require("./core/coreModel");

class Answer extends CoreModel {
  text;
  questionId;

  constructor(idParam, textParam, questionIdParam) {
    super(idParam);
    this.text = textParam;
    this.questionId = questionIdParam;
  }
}

module.exports = Answer;
