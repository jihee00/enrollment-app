import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; 
import { useProfile } from './profileContext';

const EditProfile = () => {
  const { profile, updateProfile } = useProfile();
  const router = useRouter();

  if (!profile) return <div>Loading...</div>

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newProfile = { ...profile, [name]: value };
    updateProfile(newProfile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);

    try {
      const response = await fetch('/api/students/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        console.log('Profile successfully updated');
        router.push('/profile');
      } else {
        console.error('Failed to update profile');
      }
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
                value={profile.name || ''} 
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="email"
                value={profile.email || ''} 
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Student ID</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="studentId"
                value={profile.studentId || ''} 
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Phone</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="phone"
                value={profile.phone || ''} 
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Address</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="address"
                value={profile.address || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Emergency Contacts</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="emergencyContacts"
                value={profile.emergencyContacts || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>SIN/ITN Information</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="sin"
                value={profile.sin || ''} 
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
