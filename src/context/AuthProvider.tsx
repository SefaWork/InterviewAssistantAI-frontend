import { useState, useEffect } from 'react';
import AuthContext, { type AuthTokens, type AuthContextType } from './AuthContext';

interface AuthProviderProps {
    children: React.ReactNode
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
        const tokens = localStorage.getItem('authTokens');
        return tokens ? JSON.parse(tokens) : null;
    });

    const [loading, setLoading] = useState(true);

    const fetchTokens = async (email: string, password: string) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed.');
            }

            const data = await response.json();
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
    };

    useEffect(() => {
        if (authTokens) {
            localStorage.setItem('authTokens', JSON.stringify(authTokens));
        }
        setLoading(false);
    }, [authTokens]);

    const contextData: AuthContextType = {
        authTokens,
        fetchTokens,
        logoutUser,
        setAuthTokens
    };

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};