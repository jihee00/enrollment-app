// pages/api/students/add.js
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';

export default async function handler(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    await connectToDatabase();
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
}
