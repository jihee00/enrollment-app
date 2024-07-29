import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/manage-schedule.module.css';

export default function ManageSchedule() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [availability, setAvailability] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [sectionCode, setSectionCode] = useState('');
  const [day, setDay] = useState('');
  const [timeframe, setTimeframe] = useState('');

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

  const handleAddSection = async () => {
    if (selectedCourse && sectionCode && day && timeframe) {
      try {
        await axios.post('/api/courses/addSection', { courseId: selectedCourse, section: { code: sectionCode, day, timeframe } });
        const coursesRes = await axios.get('/api/courses');
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error adding section:', error);
      }
    }
  };

  const handleRemoveSection = async (sectionCode) => {
    if (selectedCourse && sectionCode) {
      try {
        await axios.post('/api/courses/removeSection', { courseId: selectedCourse, sectionCode });
        const coursesRes = await axios.get('/api/courses');
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error removing section:', error);
      }
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <h1 className={styles.heading1}>Manage Schedule</h1>

        <div>
          <label className={styles.label}>
            Select Student:
            <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent} className={styles.select}>
              <option value="">--Select a student--</option>
              {students.map(student => (
                <option key={student._id} value={student._id}>{student.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className={styles.label}>
            Select Course:
            <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse} className={styles.select}>
              <option value="">--Select a course--</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={handleAddCourse} disabled={!availability || !eligibility} className={styles.button}>Add Course</button>
      </div>

      <div className={styles.rightColumn}>
        {selectedStudent && (
          <div>
            <h2 className={styles.heading2}>Current Schedule</h2>
            <ul className={styles.list}>
              {students.find(student => student._id === selectedStudent)?.schedule.map(course => (
                <li key={course._id} className={styles.listItem}>
                  {course.name}
                  <button onClick={() => handleRemoveCourse(course._id)} className={styles.button}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedCourse && (
          <div>
            <h2 className={styles.heading2}>Manage Sections for Selected Course</h2>
            <div>
              <label className={styles.sectionLabel}>
                Section Code:
                <input type="text" value={sectionCode} onChange={(e) => setSectionCode(e.target.value)} className={styles.input} />
              </label>
            </div>
            <div>
              <label className={styles.sectionLabel}>
                Day:
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} className={styles.input} />
              </label>
            </div>
            <div>
              <label className={styles.sectionLabel}>
                Timeframe:
                <input type="text" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className={styles.input} />
              </label>
            </div>
            <button onClick={handleAddSection} className={styles.button}>Add Section</button>

            <h3 className={styles.heading3}>Sections</h3>
            <ul className={styles.list}>
              {courses.find(course => course._id === selectedCourse)?.sections.map(section => (
                <li key={section.code} className={styles.listItem}>
                  {section.code} - {section.day} - {section.timeframe}
                  <button onClick={() => handleRemoveSection(section.code)} className={styles.button}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {availability === false && <p className={styles.error}>The selected course is not available.</p>}
        {eligibility === false && <p className={styles.error}>The student is not eligible for the selected course.</p>}
      </div>
    </div>
  );
}
