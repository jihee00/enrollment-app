// pages/advisor.js
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css";

export default function Advisor() {
  const router = useRouter();
  const [advisors, setAdvisors] = useState([
    {
      id: 1,
      title: "Student Advisor",
      program: "Computer Programming/Analysis",
      name: "Emily Clark",
      email: "emily.clark@example.com",
      phone: "647-887-3654",
      image: "/images/advisor1.png",
    },
    {
      id: 2,
      title: "Student Coordinator",
      program: "Computer Programming/Analysis",
      name: "James Smith",
      email: "james.smith@example.com",
      phone: "416-553-9837",
      image: "/images/advisor2.png",
    },
  ]);

  return (
    <Container className="py-5">
      <Row className="gy-4">
        {advisors.map((advisor) => (
          <Col key={advisor.id} xs={12} md={6} lg={4}>
            <Card className={styles.advisorCard}>
              <Card.Body className={styles.advisorCardBody}>
                <Card.Title>{advisor.name}</Card.Title>
                <div className={styles.advisorContent}>
                  <div className={styles.advisorImg}>
                    <Card.Img
                      src={advisor.image}
                      alt={advisor.name}
                      className={styles.advisorImage}
                    />
                  </div>
                  <div className={styles.advisorInfo}>
                    <Card.Text>{advisor.program}</Card.Text>
                    <Card.Text>{advisor.title}</Card.Text>
                    <Card.Text>{advisor.email}</Card.Text>
                    <Card.Text>{advisor.phone}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
