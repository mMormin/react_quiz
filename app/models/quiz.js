const CoreModel = require("./core/coreModel");

class Quiz extends CoreModel {
  _title;
  _description;
  _userId;

  constructor(idParam, titleParam, descriptionParam, userIdParam) {
    super(idParam);
    this.title = titleParam;
    this.description = descriptionParam;
    this.userId = userIdParam;
  }

  set title(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `title must to be a String. Received type : "${typeof value}"`
      );

    this._title = value;
  }

  get title() {
    return this._title;
  }

  set description(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `description must to be a String. Received type : "${typeof value}"`
      );

    this._description = value;
  }

  get description() {
    return this._description;
  }

  set userId(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `userId must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );
    this._userId = value;
  }

  get userId() {
    return this._userId;
  }
}

module.exports = Quiz;
