import Database from "../Database/index.js";
import model from "./model.js"; // Ensure that the model.js file exports the required model object

export function enrollUserInCourse(userId, courseId) {
  //console.log(userId, courseId);
  const newEnrollment = { user: userId, course: courseId };
  return model.create(newEnrollment);
}
export function unenrollUserInCourse(userId, courseId) {
  return model.deleteOne({ user: userId, course: courseId });
}
export async function findCoursesForEnrolledUser(userId) {
  return model.find({ user: userId });
}

export function findAllEnrollments() {
return model.find();
}

export function findUsersForEnrolledCourse(courseId) {
  return model.find({ course: courseId });
}
