const CoreModel = require("./core/coreModel");

class Answer extends CoreModel {
  _text;
  _questionId;

  constructor(obj) {
    super(obj);
    this.text = obj.text;
    this.questionId = obj.questionId;
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

  set questionId(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `questionId must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._questionId = value;
  }
  get questionId() {
    return this._questionId;
  }
}

module.exports = Answer;
