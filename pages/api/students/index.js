// pages/api/students/index.js
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';
import Course from '../../../models/Course'; // Ensure the Course model is imported

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const students = await Student.find({}).populate('schedule');
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students', error });
  }
}
