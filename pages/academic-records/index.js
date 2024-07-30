// AcademicRecordsPage.js

import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/lib/authContext';

const AcademicRecordsPage = () => {
  const { authenticated, userName } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (authenticated && userName) {
      fetchAcademicRecords();
    }
  }, [authenticated, userName]);

  const fetchAcademicRecords = async () => {
    try {
      const response = await axios.get('/api/students/academic-record', {
        params: { userName }
      });
      if (response.data.success) {
        const sortedRecords = sortRecordsBySemester(response.data.data.courses);
        setRecords(sortedRecords);
      }
    } catch (error) {
      console.error('Error fetching academic records:', error);
    }
  };

  const sortRecordsBySemester = (recordsToSort) => {
    const seasonOrder = {
      fall: 1,
      summer: 2,
      winter: 3
    };
  
    return [...recordsToSort].sort((a, b) => {
      const [seasonA, yearA] = a.term.toLowerCase().split(' ');
      const [seasonB, yearB] = b.term.toLowerCase().split(' ');
      if (yearA !== yearB) {
        return yearB - yearA; 
      }
      return seasonOrder[seasonA] - seasonOrder[seasonB];
    });
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
              {records.map((record, index) => (
                <tr key={index}>
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
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AcademicRecordsPage;