const CoreModel = require("./core/coreModel");

class Question extends CoreModel {
  _text;
  _tip;
  _levelId;
  _quizId;
  _answerId;

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

  set text(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `text must to be a String. Received type : "${typeof value}"`
      );

    this._text = value;
  }
  get text() {
    return this._text;
  }

  set tip(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `tip must to be a String. Received type : "${typeof value}"`
      );

    this._tip = value;
  }

  get tip() {
    return this._tip;
  }

  set levelId(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `levelId must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._levelId = value;
  }

  get levelId() {
    return this._levelId;
  }

  set quizId(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `quizId must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._quizId = value;
  }

  get quizId() {
    return this._quizId;
  }

  set answerId(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `answerId must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._answerId = value;
  }

  get answerId() {
    return this._answerId;
  }
}

module.exports = Question;
