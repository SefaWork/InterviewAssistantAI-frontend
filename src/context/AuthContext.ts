import { createContext, type Dispatch, type SetStateAction } from "react";

export interface AuthContextType {
    accessToken: string | undefined,
    setAccessToken: Dispatch<SetStateAction<string | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;