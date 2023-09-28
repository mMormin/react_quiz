const Answer = require("./answer.js");
const Level = require("./level.js");
const Question = require("./question.js");
const Quiz = require("./quiz.js");
const Tag = require("./tag.js");
const User = require("./user.js");

// USER <-> QUIZ
User.hasMany(Quiz, {
  foreignKey: "user_id",
  as: "quizzesList",
});
Quiz.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

// QUIZ <-> TAG
Quiz.belongsToMany(Tag, {
  through: "quiz_has_tag",
  foreignKey: "quiz_id",
  as: "tagsList",
});
Tag.belongsToMany(Quiz, {
  through: "quiz_has_tag",
  foreignKey: "tag_id",
  as: "quizzesList",
});

// QUIZ <-> QUESTION
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questionsList",
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz",
});

// QUESTION <-> LEVEL
Level.hasMany(Question, {
  foreignKey: "level_id",
  as: "questionsList",
});
Question.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level",
});

// QUESTION <-> ANSWER
Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "answersList",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});
Question.belongsTo(Answer, {
  foreignKey: "answer_id",
  as: "goodAnswer",
});
Answer.hasOne(Question, {
  foreignKey: "answer_id",
  as: "validates"
});

module.exports = {
  User,
  Quiz,
  Tag,
  Question,
  Answer,
  Level,
};
