import { createContext } from 'react';

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface AuthContextType {
    authTokens: AuthTokens | null;
    fetchTokens: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    setAuthTokens: (tokens: AuthTokens | null) => void;
    registerUser: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;
