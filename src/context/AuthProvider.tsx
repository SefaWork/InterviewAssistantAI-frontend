import { useState } from "react";
import axiosServer from "../api/axiosServer";
import AuthContext from "./AuthContext";
import axios from "axios";
import type { LocalizedMessage } from "../types/i18n";

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({children}: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);

    const login = async (email: string, password: string): Promise<{ success: boolean, reason?: LocalizedMessage }> => {
        try {
            const {data} = await axiosServer.post("/api/auth/login/", {email, password});

            if (data.access && data.refresh) {
                // Login was successful.
                setAccessToken(data.access);
                setRefreshToken(data.refresh);
                return {
                    success: true
                }
            }

            return {success: false, reason: {key: "error.server_error"}}
        } catch(err) {
            if (axios.isAxiosError(err) && err.response) {
                switch (err.response.status) {
                    case 401:
                        return {success: false, reason: {key: "error.invalid_credentials"}}
                    case 403:
                        return {success: false, reason: {key: "error.forbidden"}}
                    default:
                        return {success: false, reason: {key: "error.server_error"}}
                }
            }
        }

        return {
            success: false,
            reason: {key: "error.server_unreachable"}
        }
    }

    const register = async (email: string, password: string): Promise<{ success: boolean, reason?: LocalizedMessage }> => {
        try {
            await axiosServer.post("/api/auth/register/", {email, password});
            return await login(email, password);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                switch (err.response.status) {
                    case 409:
                        return {success: false, reason: {key: "error.email_exists"}}
                    case 403:
                        return {success: false, reason: {key: "error.forbidden"}}
                    default:
                        return {success: false, reason: {key: "error.server_error"}}
                }
            }
        }

        return {success: false, reason: {key: "error.server_unreachable"}}
    }

    return (
        <AuthContext.Provider value={{accessToken, refreshToken, login, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;