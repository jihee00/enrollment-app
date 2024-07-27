// pages/manage-schedule.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageSchedule() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [availability, setAvailability] = useState(null);
  const [eligibility, setEligibility] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const studentsRes = await axios.get('/api/students');
      setStudents(studentsRes.data);

      const coursesRes = await axios.get('/api/courses');
      setCourses(coursesRes.data);
    }
    fetchData();
  }, []);

  const checkAvailabilityAndEligibility = async (studentId, courseId) => {
    try {
      const availabilityRes = await axios.post('/api/courses/checkAvailability', { courseId });
      setAvailability(availabilityRes.data.available);

      const eligibilityRes = await axios.post('/api/courses/checkEligibility', { studentId, courseId });
      setEligibility(eligibilityRes.data.eligible);
    } catch (error) {
      console.error('Error checking availability or eligibility:', error);
    }
  };

  useEffect(() => {
    if (selectedStudent && selectedCourse) {
      checkAvailabilityAndEligibility(selectedStudent, selectedCourse);
    }
  }, [selectedStudent, selectedCourse]);

  const handleAddCourse = async () => {
    if (selectedStudent && selectedCourse && availability && eligibility) {
      await axios.post('/api/students/addCourse', { studentId: selectedStudent, courseId: selectedCourse });
      const studentsRes = await axios.get('/api/students');
      setStudents(studentsRes.data);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    if (selectedStudent && courseId) {
      await axios.post('/api/students/removeCourse', { studentId: selectedStudent, courseId });
      const studentsRes = await axios.get('/api/students');
      setStudents(studentsRes.data);
    }
  };

  return (
    <div>
      <h1>Manage Schedule</h1>

      <div>
        <label>
          Select Student:
          <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
            <option value="">--Select a student--</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Select Course:
          <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
            <option value="">--Select a course--</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={handleAddCourse} disabled={!availability || !eligibility}>Add Course</button>

      {selectedStudent && (
        <div>
          <h2>Current Schedule</h2>
          <ul>
            {students.find(student => student._id === selectedStudent)?.schedule.map(course => (
              <li key={course._id}>
                {course.name}
                <button onClick={() => handleRemoveCourse(course._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {availability === false && <p>The selected course is not available.</p>}
      {eligibility === false && <p>The student is not eligible for the selected course.</p>}
    </div>
  );
}