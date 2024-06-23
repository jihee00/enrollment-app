import { useState } from 'react';
import styles from '../../styles/gpa-calculator.module.css'; // Importing CSS module

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ courseName: 'Course1', grade: '', credits: '3.00' }]);
  const [gpa, setGpa] = useState(null);

  const handleAddCourse = () => {
    const newCourseName = `Course${courses.length + 1}`;
    setCourses([...courses, { courseName: newCourseName, grade: '', credits: '3.00' }]);
  };

  const handleRemoveCourse = (index) => {
    const newCourses = courses.filter((_, idx) => idx !== index);
    setCourses(newCourses);
  };

  const handleChange = (index, field, value) => {
    const newCourses = courses.map((course, idx) =>
      idx === index ? { ...course, [field]: value } : course
    );
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(({ grade, credits }) => {
      const creditValue = parseFloat(credits);
      const gradeValue = getGradeValue(grade);

      if (!isNaN(creditValue) && !isNaN(gradeValue)) {
        totalCredits += creditValue;
        totalPoints += gradeValue * creditValue;
      }
    });

    const gpa = totalPoints / totalCredits;
    setGpa(totalPoints && totalCredits ? gpa.toFixed(2) : '0.00');
  };

  const getGradeValue = (grade) => {
    const gradeMap = {
      'A+': 4.0,
      'A': 3.5,
      'B+': 3.0,
      'B': 2.5,
      'C+': 2.0,
      'C': 1.5,
      'D': 1.0,
      'F': 0.0,
    };
    return gradeMap[grade.toUpperCase()] || 0.0;
  };

  return (
    <div className={styles.container}>
      <h1>GPA Calculator</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Grade</th>
            <th>Credits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Course Name"
                  value={course.courseName}
                  onChange={(e) => handleChange(index, 'courseName', e.target.value)}
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Grade"
                  value={course.grade}
                  onChange={(e) => handleChange(index, 'grade', e.target.value)}
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Credits"
                  value={course.credits}
                  onChange={(e) => handleChange(index, 'credits', e.target.value)}
                  className={styles.input}
                />
              </td>
              <td>
                <button onClick={() => handleRemoveCourse(index)} className={styles.button}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='styles.buttonContainer'>
        <button onClick={handleAddCourse} className={styles.button}>
          Add Course
        </button>
        <button onClick={calculateGPA} className={styles.button}>
          Calculate GPA
        </button>
      </div>
      
      {gpa !== null && <h2>Your GPA: {gpa}</h2>}
    </div>
  );
};

export default GPACalculator;
