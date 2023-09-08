const CoreModel = require("./core/coreModel");

class Quiz extends CoreModel {
  title;
  description;
  userId;

  constructor(idParam, titleParam, descriptionParam, userIdParam) {
    super(idParam);
    this.title = titleParam;
    this.description = descriptionParam;
    this.userId = userIdParam;
  }
}

module.exports = Quiz;
