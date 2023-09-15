const validator = require("email-validator");
const bcrypt = require("bcrypt");
const { User } = require("../models/assoc");

const userController = {
  signUpPage: (req, res) => {
    res.render("signup");
  },

  async addNewUser(req, res) {
    const { firstname, lastname, email, password, confirmation } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const userExist = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (!firstname || !lastname || !email || !password) {
      response.render("signup", {
        error: "Toutes les informations nécessaires n'ont pas été transmises.",
      });
    }

    if (!validator.validate(data.email)) {
      res.render("signup", {
        error: "Cet email n'est pas valide.",
      });
    }

    if (userExist) {
      res.render("signup", {
        error: "Cet email est déjà utilisé",
      });
    }

    if (password !== confirmation) {
      res.render("signup", {
        error:
          "Le mot de passe et la confirmation ne correspondent pas. Essaie encore !",
      });
    }

    // ( il faudrait vérifier aussi que le mdp réponde aux recomendations de la CNIL... )
    // on pourrait même carrément utiliser un validator par exemple Joi : cf. la doc : https://www.npmjs.com/package/joi
    // autre amélioration : gestion d'erreurs (404 / 500 ...) + renseigner le status codes HTTP

    const newUser = User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });
    await newUser.save();

    response.redirect("/signup");
  },
};

module.exports = userController;
