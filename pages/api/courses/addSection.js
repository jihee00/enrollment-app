// pages/api/courses/addSection.js
import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { courseId, section } = req.body;

  if (!courseId || !section || !section.code || !section.day || !section.timeframe) {
    return res.status(400).json({ message: 'Course ID, Section code, Section day, and Section timeframe are required' });
  }

  try {
    await connectToDatabase();
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.sections.push(section);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('Error adding section to course:', error);
    res.status(500).json({ message: 'Error adding section to course', error });
  }
}
