// pages/api/courses/removeSection.js
import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { courseId, sectionCode } = req.body;

  if (!courseId || !sectionCode) {
    return res.status(400).json({ message: 'Course ID and Section code are required' });
  }

  try {
    await connectToDatabase();
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.sections = course.sections.filter(section => section.code !== sectionCode);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('Error removing section from course:', error);
    res.status(500).json({ message: 'Error removing section from course', error });
  }
}
