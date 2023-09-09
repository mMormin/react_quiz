const CoreModel = require("./core/coreModel");

class Tag extends CoreModel {
  _name;

  constructor(idParam, nameParam) {
    super(idParam);
    this.name = nameParam;
  }

  set name(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `name must to be a String. Received type : "${typeof value}"`
      );

    this._name = value;
  }

  get name() {
    return this._name;
  }
}

module.exports = Tag;
