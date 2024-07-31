import connectToDatabase from "../../../lib/mongodb";
import Student from "../../../models/Student";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  expiresIn: '1h'
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "User Name and password are required" });
  }

  try {
    await connectToDatabase();

    // Check if the user exists
    const student = await Student.findOne({ userName });
    if (!student) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const payload = {
      _id: student._id,
      userName: student.userName,
    };

    const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: jwtOptions.expiresIn });

    // Successfully authenticated
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}
