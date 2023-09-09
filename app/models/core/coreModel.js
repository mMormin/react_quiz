class CoreModel {
  _id;

  constructor(idParam) {
    this.id = idParam;
  }

  set id(value) {
    if (!Number.isInteger(value) || value < 1)
      throw new Error(
        `id must be a Number and not 0. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._id = value;
  }

  get id() {
    return this._id;
  }
}

module.exports = CoreModel;
