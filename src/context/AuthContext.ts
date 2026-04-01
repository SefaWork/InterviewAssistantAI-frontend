import { createContext } from "react";
import type { LocalizedMessage } from "../types/i18n";

export interface AuthContextType {
    accessToken?: string,
    refreshToken?: string,

    /**Sends a request to the server to login. Throws an exception on failure. */
    login: (email: string, password: string) => Promise<{success: boolean, reason?: LocalizedMessage}>,

    /**Sends a request to the server to register. Throws an exception on failure. */
    register: (email: string, password: string) => Promise<{success: boolean, reason?: LocalizedMessage}>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;