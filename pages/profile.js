import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import profileDefault from '@/public/images/profile.png';
import styles from '../styles/Home.module.css'; 
import { useProfile } from './profileContext';


const ProfilePage = () => {
  const { profile } = useProfile();

  return (
    <>
      <Container className="py-5">
        <Card className="mb-4 shadow-md border">
          <Card.Body className="px-4 py-5">
              <Row>
                <Col md={4} className="text-center">
                <h1 className="text-3xl text-center font-bold mb-4">Your Profile</h1>
                  <div className="mb-4">
                    <Image
                      className="rounded-circle"
                      src={profileDefault}
                      alt="User"
                      width={192}
                      height={192}
                    />              
                  </div>
                  <h4 className="text-2xl mb-4"><span className="font-bold">Name: </span>John Doe</h4>
                  <h4 className="text-2xl"><span className="font-bold">Email: </span>john@gmail.com</h4>
                </Col>
                <Col md={8}>
                  <h4 className="text-xl font-semibold mb-4">Personal Details</h4>
                  <Card className="mb-4">
                    <Card.Body>
                      <div>
                        <Card.Text>ID: {profile.id}</Card.Text>
                        <Card.Text>Phone: {profile.phone}</Card.Text>
                        <Card.Text>Address: {profile.address}</Card.Text>
                        <Card.Text>Emergency Contacts: {profile.emergencyContacts}</Card.Text>
                        <Card.Text>SIN/ITN Information: {profile.sin}</Card.Text>
                        <div className="d-flex justify-content-center mt-3">
                          <Button href="/editProfile" className="btn-black mr-2">
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