import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; 
import { useProfile } from './profileContext';

const EditProfile = () => {
  const { profile, updateProfile } = useProfile();
  const router = useRouter();

  const handleIdChange = (e) => {
    const newProfile = { ...profile, id: e.target.value };
    updateProfile(newProfile);
  };

  const handlePhoneChange = (e) => {
    const newProfile = { ...profile, phone: e.target.value };
    updateProfile(newProfile);
  };

  const handleAddressChange = (e) => {
    const newProfile = { ...profile, address: e.target.value };
    updateProfile(newProfile);
  };

  const handleEmergencyContactsChange = (e) => {
    const newProfile = { ...profile, emergencyContacts: e.target.value };
    updateProfile(newProfile);
  };

  const handleSinChange = (e) => {
    const newProfile = { ...profile, sin: e.target.value };
    updateProfile(newProfile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    router.push('/profile');
  };

  return (
    <Container className="py-5">
      <Card className="mb-4 shadow-md border">
        <Card.Body className="px-4 py-5">
          <h1 className="text-3xl text-center font-bold mb-4">Edit Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>ID</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="id"
                value={profile.id} 
                onChange={handleIdChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Phone</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="phone"
                value={profile.phone} 
                onChange={handlePhoneChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Address</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="address"
                value={profile.address} 
                onChange={handleAddressChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Emergency Contacts</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="emergencyContacts"
                value={profile.emergencyContacts} 
                onChange={handleEmergencyContactsChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>SIN/ITN Information</strong></Form.Label>
              <Form.Control 
                type="text" 
                name="sin"
                value={profile.sin} 
                onChange={handleSinChange} 
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
}

export default EditProfile;
