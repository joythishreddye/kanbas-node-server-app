import model from "./model.js";

export function enrollUserInCourse(userId, courseId) {
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

export async function findUsersForEnrolledCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate('user');
  return enrollments.map(enrollment => enrollment.user);
}
