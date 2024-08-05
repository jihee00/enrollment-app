import connectToDatabase from "../../../lib/mongodb";
import Student from "../../../models/Student";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    const studentId = req.query.id;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID not provided" });
    }

    const student = await Student.findById(studentId).populate("schedule");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student", error });
  }
}
