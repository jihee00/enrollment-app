import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Schedule() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "COM101",
      day: "Monday",
      time: "9:00 - 10:30",
      campus: "Newnham",
      room: "A4040",
    },
    {
      id: 2,
      name: "OOP111",
      day: "Wednesday",
      time: "11:00 - 1:30",
      campus: "Newnham",
      room: "C2050",
    },
    {
      id: 3,
      name: "IPC112",
      day: "Tuesday",
      time: "2:00 - 4:15",
      campus: "Newnham",
      room: "B1010",
    },
  ]);

  return (
    <Container className="py-5">
      <Row className="gy-4">
        <div className={styles.container}>
          <h4 style={{ marginLeft: "40px" }}>Schedule</h4>
          <ul className={styles.classList}>
            {classes.map((classItem) => (
              <Col key={classItem.id} xs={12} md={6} lg={4}>
                <Card className={styles.ScheduleCard}>
                  <Card.Body className={styles.ScheduleCardBody}>
                    <Card.Title>{classItem.name}</Card.Title>
                    <div className={styles.ScheduleContent}>
                      <div className={styles.ScheduleInfo}>
                        <Card.Text>{classItem.day}</Card.Text>
                        <Card.Text>{classItem.time}</Card.Text>
                        <Card.Text>{classItem.room}</Card.Text>
                        <Card.Text>{classItem.campus}</Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </ul>
        </div>
      </Row>
    </Container>
  );
}
