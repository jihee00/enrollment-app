import connectToDatabase from "@/lib/mongodb";
import Student from "@/models/Student";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const studentRecord = await Student.findOne({ userName: req.query.userName });
        if (!studentRecord) {
          return res.status(404).json({ success: false, message: 'Student Records not found' });
        }
        res.status(200).json({ success: true, data: studentRecord });

      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}