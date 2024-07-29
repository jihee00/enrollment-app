import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { courses } = req.body;

  if (!Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ message: 'Courses array is required' });
  }

  try {
    await connectToDatabase();

    const createdCourses = await Course.insertMany(courses);
    res.status(200).json(createdCourses);
  } catch (error) {
    console.error('Error adding courses:', error);
    res.status(500).json({ message: 'Error adding courses', error });
  }
}
