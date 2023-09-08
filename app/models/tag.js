const CoreModel = require("./core/coreModel");

class Tag extends CoreModel {
  name;

  constructor(idParam, nameParam) {
    super(idParam);
    this.name = nameParam;
  }
}

module.exports = Tag;
