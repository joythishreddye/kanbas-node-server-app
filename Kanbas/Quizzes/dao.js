import model from "./model.js";

export function findAllQuizzes() {
  return model.find()
}
export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createQuiz(quiz) {
  delete quiz._id
  return model.create(quiz);
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
  return model.findByIdAndUpdate({ _id: quizId }, quizUpdates, { new: true });
}

export function findQuizById(quizId) {
  return model.findOne({ _id: quizId });
}

