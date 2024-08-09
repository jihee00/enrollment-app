import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/manage-schedule.module.css";
import { jwtDecode } from "jwt-decode";

export default function ManageSchedule() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [availability, setAvailability] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [sections, setSections] = useState("");
  const [day, setDay] = useState("");
  const [timeframe, setTimeframe] = useState("");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No token found!!!!");
        return;
      }

      const decodedToken = jwtDecode(token);
      const id = decodedToken._id;

      try {
        const coursesRes = await axios.get("/api/courses");
        setCourses(coursesRes.data);

        // Fetch the current student based on the student id
        const currentStudentRes = await axios.get("/api/students/getOne", {
          params: { id },
        });
        setSelectedStudent(currentStudentRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  const checkAvailabilityAndEligibility = async (studentId, courseId) => {
    try {
      const availabilityRes = await axios.post(
        "/api/courses/checkAvailability",
        { courseId }
      );
      setAvailability(availabilityRes.data.available);

      const eligibilityRes = await axios.post("/api/courses/checkEligibility", {
        studentId,
        courseId,
      });
      setEligibility(eligibilityRes.data.eligible);
    } catch (error) {
      console.error("Error checking availability or eligibility:", error);
    }
  };

  useEffect(() => {
    if (selectedStudent && selectedCourse) {
      //checkAvailabilityAndEligibility(selectedStudent._id, selectedCourse);

      // Fetch sections for the selected course
      const course = courses.find((course) => course._id === selectedCourse);
      if (course) {
        setSections(course.sections || []);
      }
    }
  }, [selectedStudent, selectedCourse, courses]);

  const handleAddCourse = async (courseId, section) => {
    if (selectedStudent && selectedCourse) {
      try {
        const c = await axios.get("/api/courses/getOne", {
          params: { courseId },
        });

        const newCourse = [
          {
            name: c.data.name,
            code: c.data.code,
            sections: [section],
          },
        ];

        const createCourseRes = await axios.post("/api/courses/add", newCourse);
        const createdCourse = createCourseRes.data;

        const updatedStudentRes = await axios.post("/api/students/addCourse", {
          studentId: selectedStudent._id,
          courseId: createdCourse[0]._id, // Use the ID of the newly created course
        });

        console.log("handle Add course");

        setSelectedStudent(updatedStudentRes.data);
      } catch (error) {
        console.error("Error adding course:", error);
      }
    }
  };

  const handleRemoveCourse = async (course) => {
    if (selectedStudent && course) {
      try {
        const updatedStudentRes = await axios.post(
          "/api/students/removeCourse",
          {
            studentId: selectedStudent._id,
            courseId: course._id,
          }
        );
        setSelectedStudent(updatedStudentRes.data);
      } catch (error) {
        console.error("Error removing course:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <h1 className={styles.heading1}>Manage Schedule</h1>

        <div>
          Student: {selectedStudent ? selectedStudent.name : "Loading..."}
        </div>

        <div>
          <label className={styles.label}>
            Select Course:
            <select
              onChange={(e) => setSelectedCourse(e.target.value)}
              value={selectedCourse}
              className={styles.select}
            >
              <option value="">--Select a course--</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedCourse && (
          <div>
            <h2 className={styles.heading2}>Available Sections</h2>
            <ul className={styles.list}>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <li key={section.code} className={styles.listItem}>
                    {section.code} - {section.day} - {section.timeframe}
                    <button
                      onClick={() => handleAddCourse(selectedCourse, section)}
                      className={styles.button}
                    >
                      Add
                    </button>
                  </li>
                ))
              ) : (
                <li>No sections available</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        {selectedStudent && (
          <div>
            <h2 className={styles.heading2}>Current Schedule</h2>
            <ul className={styles.list}>
              {selectedStudent.schedule.length > 0 ? (
                selectedStudent.schedule.map((course) => (
                  <li
                    key={course._id}
                    className={styles.listItem}
                    style={{ padding: "15px", width: "550px" }}
                  >
                    {/* Display course details excluding _id */}
                    <div style={{ textAlign: "left" }}>
                      <div>Name: {course.name}</div>
                      <div>Code: {course.code}</div>
                      <div>Sections:</div>
                      <ul>
                        {course.sections.map((section) => (
                          <li key={section._id}>
                            {section.code} - {section.day} - {section.timeframe}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleRemoveCourse(course)}
                      className={styles.button}
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li>No courses available</li>
              )}
            </ul>
          </div>
        )}
        {availability === false && (
          <p className={styles.error}>The selected course is not available.</p>
        )}
        {eligibility === false && (
          <p className={styles.error}>
            The student is not eligible for the selected course.
          </p>
        )}
      </div>
    </div>
  );
}
