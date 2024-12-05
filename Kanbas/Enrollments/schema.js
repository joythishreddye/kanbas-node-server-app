import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        grade: Number,
    },
    { collection: "enrollments" }
);
export default schema;