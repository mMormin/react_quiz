const CoreModel = require("./core/coreModel");

class Level extends CoreModel {
  name;

  constructor(idParam, namaParam) {
    super(idParam);
    this.name = namaParam;
  }
}

module.exports = Level;
