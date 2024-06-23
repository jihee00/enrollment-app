// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '@/lib/authenticate';
import { useAuth } from '@/lib/authContext';
import { Alert } from 'react-bootstrap';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const { setAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await authenticateUser(username, password);
            console.log('Authentication result:', result); // Debugging log
            setAuthenticated(true);
            router.push('/profile'); // Redirect to profile page on successful login
        } catch (err) {
            console.error('Error during login:', err); // Debugging log
            setWarning(err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h1>
                {warning && (
                    <Alert variant="danger" className="mb-3">
                        {warning}
                    </Alert>
                )}
                <label style={{ marginBottom: '10px' }}>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#333', color: '#fff' }}
                    />
                </label>
                <label style={{ marginBottom: '20px' }}>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#333', color: '#fff' }}
                    />
                </label>
                <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
}
