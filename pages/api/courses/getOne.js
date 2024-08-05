import connectToDatabase from "../../../lib/mongodb";
import Course from "../../../models/Course";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    const courseId = req.query.courseId;
    
    if (!courseId) {
      return res.status(400).json({ message: "course ID not provided" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Error fetching course", error });
  }
}
