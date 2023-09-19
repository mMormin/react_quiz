const profileController = {
  profilePage: (req, res) => {
    res.render("profile");
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
        return res.render("/admin/users", { error: "failure" });
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

      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = profileController;
