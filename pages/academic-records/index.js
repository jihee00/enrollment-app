import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';

const AcademicRecordsPage = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      class: 'MAP523',
      description: 'Mobile App Dev-IOS',
      term: 'Winter 2024',
      grade: 'A+',
      units: '3.00',
      status: 'Taken',
    },
    {
      id: 2,
      class: 'MST300',
      description: 'Intro to MS Cloud Technologies',
      term: 'Winter 2024',
      grade: 'A',
      units: '3.00',
      status: 'Taken',
    },
    {
      id: 3,
      class: 'WEB524',
      description: 'Web Programming Using ASP.NET',
      term: 'Winter 2024',
      grade: 'A+',
      units: '3.00',
      status: 'Taken',
    },
  ]);

  return (
    <Container className="py-5">
      <h1 className="text-3xl text-center font-bold mb-4">Academic Records</h1>
      <Card className="mb-4 shadow-md border">
        <Card.Body className="px-4 py-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
                <th>Term</th>
                <th>Grade</th>
                <th>Units</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.class}</td>
                  <td>{record.description}</td>
                  <td>{record.term}</td>
                  <td>{record.grade}</td>
                  <td>{record.units}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">
            <Button href="/academic-records" className="btn-black mr-2">
              GPA Calculator
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AcademicRecordsPage;
