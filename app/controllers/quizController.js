const mapper = require("../mapper");

const quizController = {
  homePage: async (req, res) => {
    const quizzesList = await mapper.getQuizzesList();

    res.render("home", { quizzes: quizzesList });
  },

  quizPage: async (req, res) => {
    const { id } = req.params;
    const quizById = await mapper.getQuizById(id);

    res.render("quiz", { quiz: quizById });
  },

  tagsPage: async (req, res) => {
    const tags = await mapper.getTagsList();
    
    res.render("tags", { tags });
  }
};

module.exports = quizController;
