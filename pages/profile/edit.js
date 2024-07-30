import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; 
import { useProfile } from '@/lib/profileContext';

const EditProfile = () => {
  const { profile, updateProfile } = useProfile();
  const [localProfile, setLocalProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
    }
  }, [profile]);

  if (!profile) return <div>Loading...</div>

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile updated:', localProfile);

    try {
      await updateProfile(localProfile);
      console.log('Profile successfully updated');
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container className="py-5">
      <Card className="mb-4 shadow-md border">
        <Card.Body className="px-4 py-5">
          <h1 className="text-3xl text-center font-bold mb-4">Edit Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Name</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="name"
                value={localProfile.name || ''} 
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="email"
                value={localProfile.userName || ''} 
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Student ID</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="studentId"
                value={localProfile.studentId || ''} 
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Phone</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="phone"
                value={localProfile.phone || ''} 
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Address</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="address"
                value={localProfile.address || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Emergency Contacts</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="emergencyContacts"
                value={localProfile.emergencyContacts || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>SIN/ITN Information</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="sin"
                value={localProfile.sin || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button type="submit"  variant="dark">
                Save
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
