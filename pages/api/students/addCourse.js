// pages/api/students/addCourse.js
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: 'Student ID and Course ID are required' });
  }

  try {
    await connectToDatabase();
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    student.schedule.push(course._id);
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error adding course to schedule', error });
  }
}
