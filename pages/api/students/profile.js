import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const student = await Student.findOne({ email: req.query.email });
        if (!student) {
          return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        const student = await Student.findOneAndUpdate(
          { email: req.query.email },
          req.body,
          { new: true }
        );
        if (!student) {
          return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
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
