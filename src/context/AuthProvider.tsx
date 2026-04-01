import { useState } from "react";
import AuthContext from "./AuthContext";

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({children}: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;