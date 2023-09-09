const CoreModel = require("./core/coreModel");

class Level extends CoreModel {
  _name;

  constructor(idParam, namaParam) {
    super(idParam);
    this.name = namaParam;
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

module.exports = Level;
