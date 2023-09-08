const CoreModel = require("./core/coreModel");

class Question extends CoreModel {
  text;
  tip;
  levelId;
  quizId;
  answerId;

  constructor(
    idParam,
    textParam,
    tipParam,
    levelIdParam,
    quizIdParam,
    answerIdParam
  ) {
    super(idParam);
    this.text = textParam;
    this.tip = tipParam;
    this.levelId = levelIdParam;
    this.quizId = quizIdParam;
    this.answerId = answerIdParam;
  }
}

module.exports = Question;
