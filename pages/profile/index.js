'use client';
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import profileDefault from '@/public/images/profile.png';
import styles from '@/styles/Home.module.css'; 
import { useProfile } from '@/lib/profileContext';

const ProfilePage = () => {
  const { profile } = useProfile();

  if (!profile) return <div>Loading...</div>

  return (
    <>
      <Container className="py-5">
        <Card className="mb-4 shadow-md border">
          <Card.Body className="px-4 py-5">
              <Row>
                <Col md={4} className="text-center">
                  <div className="mb-4">
                    <Image
                      className="rounded-circle"
                      src={profile.photo || profileDefault}
                      alt="Student photo"
                      width={180}
                      height={180}
                    />              
                  </div>
                  <h4 className="text-2xl mb-4"><span className="font-bold">Name: </span>{profile.name}</h4>
                  <h4 className="text-2xl"><span className="font-bold">Email: </span>{profile.userName}</h4>
                </Col>
                <Col md={8}>
                  <h4 className="text-xl font-semibold mb-4">Personal Details</h4>
                  <Card className="mb-4">
                    <Card.Body>
                      <div>
                        <Card.Text><strong>ID:</strong> {profile.studentId}</Card.Text>
                        <Card.Text><strong>Phone:</strong> {profile.phone}</Card.Text>
                        <Card.Text><strong>Address:</strong> {profile.address}</Card.Text>
                        <Card.Text><strong>Emergency Contacts:</strong> {profile.emergencyContacts}</Card.Text>
                        <Card.Text><strong>SIN/ITN Information:</strong> {profile.sin}</Card.Text>
                        <div className="d-flex justify-content-center mt-3">
                          <Button href="/profile/edit" className="btn-black mr-2">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default ProfilePage