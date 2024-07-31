// pages/api/students/add.js
import connectToDatabase from "../../../lib/mongodb";
import Student from "../../../models/Student";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userName, name, id, password, password2 } = req.body;

  if (!userName || !password || !password2 || !name) {
    return res.status(400).json({
      message: "UserName, password, password2, and name are required",
    });
  }

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    await connectToDatabase();

    //check for existing username
    const existingUser = await Student.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User Name already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const student = new Student({
      userName: userName,
      password: hashedPassword,
      name: name,
      address: "",
      emergencyContacts: "",
      phone: "",
      sin: "",
      studentId: id,
      schedule: [], // Empty array
      courses: [], // Empty array
    });

    await student.save();
    console.log("Student saved successfully");
    res.status(201).json(student);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error adding student", error });
  }
}
