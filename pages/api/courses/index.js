// pages/api/courses/index.js
import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
}
