const CoreModel = require("./core/coreModel");

class User extends CoreModel {
  _firstname;
  _lastname;
  _email;
  _password;

  constructor(obj) {
    super(obj);
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.password = obj.password;
  }

  set firstname(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `firstname must to be a String. Received type : "${typeof value}"`
      );

    this._firstname = value;
  }
  get firstname() {
    return this._firstname;
  }

  set lastname(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `lastname must to be a String. Received type : "${typeof value}"`
      );

    this._lastname = value;
  }
  get lastname() {
    return this._lastname;
  }

  set email(value) {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    if (
      !typeof value === "string" ||
      !value instanceof String ||
      emailRegex.test(value) === false
    )
      throw new Error(
        `email must to be a String with email format. Received value : "${value}" wich has type : "${typeof value}"`
      );

    this._email = value;
  }
  get email() {
    return this._email;
  }

  set password(value) {
    if (!typeof value === "string" || !value instanceof String)
      throw new Error(
        `password must to be a String. Received type : "${typeof value}"`
      );

    this._password = value;
  }
  get password() {
    return this._password;
  }
}

module.exports = User;
