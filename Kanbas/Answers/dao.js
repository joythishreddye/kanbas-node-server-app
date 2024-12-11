import model from "./model.js";
import mongoose from "mongoose";

export function findAllAnswers() {
  return model.find();
}

export function findAnswersForQuiz(quizId, userId, attempt) {
  return model.find({ quiz: quizId, user: userId, attempt: attempt });
}

export async function findLatestAnswersForQuiz(quizId, userId) {
  return await model.aggregate([
    {
      $match: {
        quiz: mongoose.Types.ObjectId.createFromHexString(quizId),
        user: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $group: {
        _id: { quiz_question: "$quiz_question", user: "$user" },
        greatestAttempt: { $max: "$attempt" },
      },
    },
    {
      $lookup: {
        from: "answers",
        let: {
          quiz_question: "$_id.quiz_question",
          user: "$_id.user",
          greatestAttempt: "$greatestAttempt",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$quiz_question", "$$quiz_question"] },
                  { $eq: ["$user", "$$user"] },
                  { $eq: ["$attempt", "$$greatestAttempt"] },
                ],
              },
            },
          },
        ],
        as: "latestAnswers",
      },
    },
    {
      $unwind: "$latestAnswers",
    },
    {
      $project: {
        _id: "$latestAnswers._id",
        quiz_question: "$latestAnswers.quiz_question",
        quiz: "$latestAnswers.quiz",
        user: "$latestAnswers.user",
        attempt: "$latestAnswers.attempt",
        answer: "$latestAnswers.answer",
        correct: "$latestAnswers.correct",
        time_started: "$latestAnswers.time_started",
        sequence: "$latestAnswers.sequence",
      },
    },
  ]);
}

export function findAnswerById(answerId) {
  return model.find({ _id: answerId });
}

export function createAnswer(answer) {
  delete answer._id;
  return model.create(answer);
}

export function deleteAnswer(answerId) {
  return model.deleteOne({ _id: answerId });
}

export function updateAnswer(answerId, answerUpdates) {
  return model.findByIdAndUpdate({ _id: answerId }, answerUpdates, {
    new: true,
  });
}