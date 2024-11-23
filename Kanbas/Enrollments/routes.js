import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.send(status);
    });

    app.delete("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        const status = await enrollmentsDao.unenrollUserInCourse(userId, courseId);
        res.send(status);
    });

    app.get("/api/enrollments/users/:userId", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await enrollmentsDao.findCoursesForEnrolledUser(userId);
        res.json(enrollments);
    });

    app.get("/api/enrollments/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const enrollments = await enrollmentsDao.findUsersForEnrolledCourse(courseId);
        res.json(enrollments);
    });

    app.get("/api/enrollments", async (req, res) => {
        const enrollments = await enrollmentsDao.findAllEnrollments();
        res.json(enrollments);
    });
}