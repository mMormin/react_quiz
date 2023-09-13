const Answer = require("./answer.js");
const Level = require("./level.js");
const Question = require("./question.js");
const Quiz = require("./quiz.js");
const Tag = require("./tag.js");
const User = require("./user.js");

User.hasMany(Quiz, {
  foreignKey: "userId",
  as: "quizList",
});

Quiz.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});

Tag.belongsToMany(Quiz, {
  foreignKey: "tagId",
  through: "quiz_has_tag",
  otherKey: "quizId",
  as: "quizsList",
});

Quiz.belongsToMany(Tag, {
  foreignKey: "quizId",
  through: "quiz_has_tag",
  otherKey: "tagId",
  as: "tagsList",
});

Level.hasMany(Question, {
  foreignKey: "levelId",
  as: "questionsList",
});

Question.belongsTo(Level, {
  foreignKey: "levelId",
  as: "level",
});

Quiz.hasMany(Question, {
  foreignKey: "QuestionId",
  as: "questionsList",
});

Question.belongsTo(Quiz, {
  foreignKey: "quizId",
  as: "quiz",
});

Question.hasMany(Answer, {
  foreignKey: "questionId",
  as: "AnswersList",
});

Question.belongsTo(Answer, {
  foreignKey: "answerId",
  as: "goodAnswer",
});

Answer.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

module.exports = {
  User,
  Quiz,
  Tag,
  Question,
  Answer,
  Level,
};
