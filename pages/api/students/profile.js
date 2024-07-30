import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const studentProfile = await Student.findOne({ userName: req.query.userName });
        if (!studentProfile) {
          return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: studentProfile });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        const studentProfile = await Student.findOneAndUpdate(
          { userName: req.query.userName  },
          req.body,
          { new: true }
        );
        if (!studentProfile) {
          return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: studentProfile });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
