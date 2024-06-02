import { Card, Form, Alert, Button } from 'react-bootstrap';
import { useState } from "react";
import { registerUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function Register(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] =useState("");
  const [warning, setWarning] = useState('');
  const router = useRouter();
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div style={{ width: '400px' }}>
        <Card className="mb-4">
          <Card.Body className='text-center'>
            <h2 className="mb-3">Register</h2>
            <p>Register for an account</p>
          </Card.Body>
        </Card>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName">Input Username:</Form.Label>
            <Form.Control
              type="text"
              value={user}
              id="userName"
              name="userName"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Input Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </Form.Group>
          {warning && (
            <Alert variant="danger" className="mb-3">
              {warning}
            </Alert>
          )}
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
