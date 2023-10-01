const { User } = require("../models");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userController = {
  signUpPage: (_, res) => {
    res.render("signup");
  },

  loginPage: (_, res) => {
    res.render("login");
  },

  profilePage: (_, res) => {
    res.render("profile");
  },

  async handleNewUser(req, res, next) {
    try {
      let error;
      const { firstname, lastname, email, password, confirmation } = req.body;

      const passwordRegex = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/
      );

      if (!firstname || !lastname || !email || !password) {
        error = "signup";
        return res.render("signup", { error });
      }

      if (!validator.validate(email)) {
        error = "email";
        return res.render("signup", { error });
      }

      if (passwordRegex.test(password) == false) {
        error = "password";
        return res.render("signup", { error });
      }

      if (password !== confirmation) {
        error = "matchingPassword";
        return res.render("signup", { error });
      }

      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        error = "alreadyExist";
        return res.render("signup", { error });
      }

      const encryptedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        email,
        role: "member",
        password: encryptedPassword,
      });

      await newUser.save();

      return res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async handleLogin(req, res) {
    try {
      const { email, password } = req.body;

      const userFound = await User.findOne({
        where: { email },
      });
      
      const validPassword = bcrypt.compareSync(password, userFound.password);

      if (!userFound || !validPassword) {
        const error = "login";
        return res.render("login", { error });
      }

      userFound.password = null;
      req.session.user = userFound;
      delete req.session.user.password;

      return res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  handleLogout(req, res) {
    req.session.user = null;
    res.redirect("/");
  },
};

module.exports = userController;
