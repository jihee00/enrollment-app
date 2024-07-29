// models/Course.js
import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  code: { type: String, required: true, match: /^[A-Z]{3}$/ },
  day: { type: String, required: true }, // e.g., "Monday", "Tuesday"
  timeframe: { type: String, required: true } // Assuming the timeframe is a string like "09:00-10:00"
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  sections: [sectionSchema]
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
