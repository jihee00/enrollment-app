// models/Student.js
import mongoose from "mongoose";
import AcademicRecord from "./AcademicRecord";
import Course from "./Course";

const studentSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  studentId: { type: String },
  phone: { type: String },
  address: { type: String },
  emergencyContacts: { type: String },
  sin: { type: String },
  photo: { type: String },
  schedule: [Course.schema],
  courses: [AcademicRecord.schema],
});

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
