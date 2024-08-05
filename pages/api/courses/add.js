import connectToDatabase from "../../../lib/mongodb";
import Course from "../../../models/Course";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const course = req.body;

  if (!course || typeof course !== "object") {
    return res.status(400).json({ message: "Invalid course data" });
  }

  try {
    await connectToDatabase();

    const createdCourse = await Course.create(course);
    res.status(200).json(createdCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Error adding course", error });
  }
}
