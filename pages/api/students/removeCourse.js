// pages/api/students/removeCourse.js
import connectToDatabase from "../../../lib/mongodb";
import Student from "../../../models/Student";

export default async function handler(req, res) {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res
      .status(400)
      .json({ message: "Student ID and Course ID are required" });
  }

  try {
    await connectToDatabase();
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.schedule = student.schedule.filter(
      (course) => course._id.toString() !== courseId
    );
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing course from schedule", error });
  }
}
