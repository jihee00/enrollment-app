import mongoose from "mongoose";

const academicRecordSchema = new mongoose.Schema({
  class: { type: String, required: true },
  description: { type: String, required: true },
  term: { type: String, required: true },
  grade: { type: String },
  units: { type: String },
  status: { type: String, required: true }
});

export default mongoose.models.AcademicRecord || mongoose.model('AcademicRecord', academicRecordSchema);