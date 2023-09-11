class Quiz_has_tag {
  _quizId;
  _tagId;

  constructor(obj) {
    this.quizId = obj.quizIdobj;
    this.tagId = obj.tagId;
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

  set tagId(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `tagId must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._tagId = value;
  }
  get tagId() {
    return this._tagId;
  }
}

module.exports = Quiz_has_tag;
