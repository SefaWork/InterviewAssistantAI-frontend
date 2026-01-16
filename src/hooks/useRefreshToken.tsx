
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function useRefreshToken() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useRefreshToken must be used within AuthProvider');
    }

    const { authTokens, setAuthTokens, logoutUser } = context;

    const refresh = async () => {
        if (!authTokens?.refresh) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: authTokens.refresh })
            });

            if (!response.ok) {
                // If refresh fails, logout user.
                logoutUser();
                throw new Error('Token refresh failed');
            }

            const data = await response.json();
            
            // Update tokens
            const newTokens = {
                access: data.access,
                refresh: authTokens.refresh // Keep existing refresh token
            };
            
            setAuthTokens(newTokens);

            return data.access;
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    };

    return refresh;
}

export default useRefreshToken;