// lib/authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, removeToken } from './authenticate';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
    }, []);

    const signOut = () => {
        removeToken();
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
