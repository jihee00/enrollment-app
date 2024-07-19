// AcademicRecordsPage.js

import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import Link from 'next/link';

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

  const [sortedRecords, setSortedRecords] = useState([]);

  useEffect(() => {
    sortRecordsBySemester();
  }, []);

  const sortRecordsBySemester = () => {
    const sorted = [...records].sort((a, b) => {
      // Assuming 'term' is in the format 'Season Year', e.g., 'Winter 2024'
      const termA = a.term.toLowerCase();
      const termB = b.term.toLowerCase();
      if (termA < termB) return -1;
      if (termA > termB) return 1;
      return 0;
    });
    setSortedRecords(sorted);
  };

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
              {sortedRecords.map((record) => (
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
            <Link href="/academic-records/gpa-calculator" passHref>
              <Button className="btn-black mr-2">GPA Calculator</Button>
            </Link>
            <Button className="btn-black" onClick={sortRecordsBySemester}>
              Sort by Semester
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AcademicRecordsPage;