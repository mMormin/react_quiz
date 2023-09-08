const CoreModel = require("./core/coreModel");

class User extends CoreModel {
  firstname;
  lastname;
  email;
  password;

  constructor(
    idParam,
    firstnameParam,
    lastnameParam,
    emailParam,
    passwordParam
  ) {
    super(idParam);
    this.firstname = firstnameParam;
    this.lastname = lastnameParam;
    this.email = emailParam;
    this.password = passwordParam;
  }
}

module.exports = User;
