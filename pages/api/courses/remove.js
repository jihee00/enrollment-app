// pages/api/courses/remove.js
import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  try {
    await connectToDatabase();
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing course', error });
  }
}
