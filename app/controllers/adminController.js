const Answer = require("../models/answer");
const Quiz = require("../models/quiz");
const Tag = require("../models/tag");
const User = require("../models/user");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db.js");

const adminController = {
  async userPage(req, res, next) {
    const modalData = { name: "user", uc: "User" };

    try {
      const users = await User.findAll({
        include: ["quizzesList"],
        order: [["created_at", "DESC"]],
      });

      res.render("admin/users", { users, data: modalData });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleUserAdd(req, res, next) {
    const { firstname, lastname, email, password } = req.body;

    try {
      const newUser = new User({
        firstname,
        lastname,
        email,
        password,
        role: "admin",
      });

      if (!newUser) {
        return res.render("/admin/users", { error: "failure" });
      }

      await newUser.save();

      res.redirect("/admin/users");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleUserEdit(req, res, next) {
    const { id } = req.params;
    let { editFirstname, editLastname, editEmail, editPassword } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.render("/admin/users", { error: "failure" });
      }

      if (!editFirstname) {
        editFirstname = user.firstname;
      }
      if (!editLastname) {
        editLastname = user.lastname;
      }
      if (!editEmail) {
        editEmail = user.email;
      }
      if (!editPassword) {
        editPassword = user.password;
      }

      user.set({
        firstname: editFirstname,
        lastname: editLastname,
        email: editEmail,
        password: editPassword,
      });

      await user.save();

      res.redirect("/admin/users");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleUserDelete(req, res, next) {
    const { id } = req.params;

    console.log(id);
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.render("/admin/users", { error: "failure" });
      }
      await user.destroy();

      res.redirect("/admin/users");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async quizPage(req, res, next) {
    const modalData = { name: "quiz", uc: "Quiz" };

    try {
      const quizzes = await Quiz.findAll({
        include: ["author", "tagsList"],
        order: [["created_at", "DESC"]],
      });

      res.render("admin/quizzes", { quizzes, data: modalData });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizAdd(req, res, next) {
    const { title, description } = req.body;

    try {
      const newQuiz = new Quiz({
        title,
        description,
        user_id: 1,
      });

      if (!newQuiz) {
        return res.render("/admin/quizzes", { error: "failure" });
      }

      await newQuiz.save();

      res.redirect("/admin/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizEdit(req, res, next) {
    const { id } = req.params;
    let { editTitle, editDescription } = req.body;

    try {
      const quiz = await Quiz.findByPk(id);

      if (!quiz) {
        return res.render("/admin/quizzes", { error: "failure" });
      }

      if (!editTitle) {
        editTitle = quiz.title;
      }

      if (!editDescription) {
        editDescription = quiz.description;
      }

      user.set({
        title: editTitle,
        description: editDescription,
      });

      await quiz.save();

      res.redirect("/admin/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleQuizDelete(req, res, next) {
    const { id } = req.params;

    try {
      await sequelize.transaction(async (t) => {
        await sequelize.query(
          `ALTER TABLE "answer" DROP CONSTRAINT answer_question_id_fkey`,
          { type: QueryTypes.RAW, transaction: t }
        );

        await sequelize.query(
          `DELETE FROM quiz WHERE id = ${id}`,
          { type: QueryTypes.DELETE, transaction: t }
        );

        await sequelize.query(
          `ALTER TABLE "answer" ADD CONSTRAINT answer_question_id_fkey FOREIGN KEY ("question_id") REFERENCES "answer"("id") ON DELETE SET NULL`,
          { type: QueryTypes.RAW, transaction: t }
        );
      });
      
      // const quiz = await Quiz.findByPk(id);

      // if (quiz) {
      //   return res.render("/admin/quizzes", { error: "failure" });
      // }

      res.redirect("/admin/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async tagPage(req, res) {
    const modalData = { name: "tag", uc: "Tag" };

    try {
      const tags = await Tag.findAll({
        order: [["created_at", "DESC"]],
        include: ["quizzesList"],
      });

      res.render("admin/tags", { tags, data: modalData });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleTagAdd(req, res, next) {
    const { name } = req.body;

    try {
      const newTag = new Tag({
        name,
      });

      if (!newTag || !name) {
        return res.render("/admin/tags", { error: "failure" });
      }

      await newTag.save();

      res.redirect("/admin/tags");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleTagEdit(req, res, next) {
    const { id } = req.params;
    let { editName } = req.body;

    try {
      const tag = await Tag.findOne({
        where: {
          id,
        },
      });

      if (!tag) {
        return res.render("/admin/quizzes", { error: "failure" });
      }

      if (!editName) {
        editName = tag.name;
      }

      user.set({
        name: editName,
      });

      await tag.save();

      res.redirect("/admin/quizzes");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async hundleTagDelete(req, res, next) {
    const { id } = req.params;

    try {
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.render("/admin/tags", { error: "failure" });
      }

      await tag.destroy();

      res.redirect("/admin/tags");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = adminController;
