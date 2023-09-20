const User = require("../models/user");

const profileController = {
  profilePage: (req, res) => {
    res.render("profile/profile");
  },

  async profileQuizzesPage(req, res) {
    res.render("profile/profile_quizzes");
  },

  async profileScorePage (req, res){
    res.render("profile/profile_score");
  },

  async hundleProfileEdit(req, res, next) {
    const emailParam = req.params.email;
    let { firstname, lastname, email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: emailParam,
        },
      });

      if (!user) {
        return res.render(`/profile/${ user.email }`, { error: "failure" });
      }

      if (!firstname) {
        firstname = user.firstname;
      }
      if (!lastname) {
        lastname = user.lastname;
      }
      if (!email) {
        email = user.email;
      }

      user.set({
        firstname,
        lastname,
        email,
      });

      await user.save();

      res.redirect(`/profile/${ user.email }`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = profileController;
