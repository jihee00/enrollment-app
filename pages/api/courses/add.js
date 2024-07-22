// pages/api/courses/add.js
import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: 'Name and code are required' });
  }

  try {
    await connectToDatabase();
    const course = new Course({ name, code });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
}
