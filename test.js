/*
const {
  Answer,
  Level,
  Question,
  QuizHasTag,
  Quiz,
  Tag,
  User,
} = require("./app/models/assoc.js");

// To check Models (require the associated Model)
const Tests = async () => {

  // Create
  const newUser = await User.create({
    // id: 420, // Si non fourni : undefined = A_I, si fourni : ajout, si 0 ou egal à existant : New Error
    firstname: "Maxime",
    lastname: "MB",
    email: "maxime@mormin.boudot",
    password: "regardepasstpchapochapo",
  });
  console.log(`Added user Id: ${newUser.id}`);

  // FindByPk
  const getTagThree = await Tag.findByPk(3);
  console.log(getTagThree.name);

  // FindAll
  const getQuestionsList = await Question.findAll({ raw: true });
  console.log(getQuestionsList);

  // FindByPk + include
  const getQuestionById = await Question.findByPk(20, {
    include: ["level"],
  });
  console.log(getQuestionById);
  console.log(`QUESTION : ${getQuestionById.text}`);
  console.log(`With Level Tag : ${getQuestionById.level.name}`);

  // Looping through included datas
  const quiz = await Quiz.findByPk(1, {
    include: ['tagList']
  });
  console.log(quiz);
  console.log(`Quiz title : ${quiz.title}`);
  console.log("Quiz tagsList" + quiz.tagsList.map(tag => tag.name));

};
Tests();
*/
