const validator = require("email-validator");
const bcrypt = require("bcrypt");
const { User } = require("../models/assoc");

const userController = {
  signUpPage: (res, req) => {
    res.render("signup");
  },

  loginPage: (req, res) => {
    res.render("login");
  },

  profilePage: (req, res) => {
    res.render("profile");
  },

  async addNewUser(req, res, next) {
    const { firstname, lastname, email, password, confirmation } = req.body;
    const passwordRegex = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/
    );

    if (!firstname || !lastname || !email || !password) {
      return res.render("signup", {
        error: "inputs",
      });
    }

    if (!validator.validate(email)) {
      return res.render("signup", {
        error: "email",
      });
    }

    if (passwordRegex.test(password) == false) {
      return res.render("signup", {
        error: "password",
      });
    }

    if (password !== confirmation) {
      res.status(500).render("signup", {
        error: "matchingPassword",
      });
    }

    try {
      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        return res.render("signup", {
          error: "alreadyExist",
        });
      }

      const encryptedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: encryptedPassword,
      });

      await newUser.save();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }

    res.redirect("/login");
  },

  async hundleLogin(req, res) {
    const { email, password } = req.body;
    const userFound = await User.findOne({
      where: { email },
    });
    const validPassword = bcrypt.compareSync(password, userFound.password);

    if (!userFound || !validPassword) {
      return res.render("login", {
        error: "Email ou mot de passe incorrect.",
      });
    }

    req.session.user = userFound;
    delete req.session.user.password;

    res.redirect("/");
  },

  hundleLogout(req, res) {
    req.session.user = null;
    res.redirect("/");
  },
};

module.exports = userController;
