import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}
export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(enrollment => enrollment.user !== userId || enrollment.course !== courseId);
}
export function findCoursesForEnrolledUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter(enrollment => enrollment.user === userId);
}

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findUsersForEnrolledCourse(courseId) {
  const { enrollments } = Database;
  return enrollments.filter(enrollment => enrollment.course === courseId);
}
