import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Schedule() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "COM101",
      day: "Monday",
      time: "9:00 - 10:30",
    },
    {
      id: 2,
      name: "OOP111",
      day: "Wednesday",
      time: "11:00 - 1:30",
    },
    {
      id: 3,
      name: "IPC112",
      day: "Tuesday",
      time: "2:00 - 4:15",
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Class Schedule</div>
      <ul className={styles.classList}>
        {classes.map((classItem) => (
          <li key={classItem.id} className={styles.classItem}>
            <div className={styles.classDetails}>
              <div className={styles.className}>{classItem.name}</div>
              <div className={styles.classDay}>{classItem.day}</div>
              <div className={styles.classTime}>{classItem.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
