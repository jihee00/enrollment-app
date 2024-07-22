// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
