// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userName: { type: String, unique: true},
  password: { type: String },
  name: { type: String, required: true },
  studentId: { type: String },
  phone: { type: String },
  address: { type: String },
  emergencyContacts: { type: String },
  sin: { type: String},
  photo: { type: String },
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
