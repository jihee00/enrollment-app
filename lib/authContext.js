// lib/authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, removeToken, getUserName } from './authenticate';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [userName, setUsername] = useState(null);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
        if (isAuthenticated()) {
            setUsername(getUserName());
        }
    }, []);

    const signOut = () => {
        removeToken();
        setAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated, userName, setAuthenticated, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
