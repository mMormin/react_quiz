const { Quiz, Tag } = require("./models/assoc");

const mapper = {
  getQuizzesList: async () => {
    const quizzes = await Quiz.findAll({ include: ["author", "tagsList"] });
    
    return quizzes;
  },

  getQuizById: async (id) => {
    const quiz = await Quiz.findByPk(id, {
      include: [
        "author",
        "tagsList",
        {
          association: "questionsList",
          include: ["answersList", { association: "level" }],
        },
      ],
    });
  },

  getTagsList: async () => {
    const tags = await Tag.findAll({
      include: ["quizzesList"],
    });

    return tags;
  },
};

module.exports = mapper;
