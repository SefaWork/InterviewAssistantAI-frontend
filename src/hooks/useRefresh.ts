import { useCallback } from "react";
import axiosServer from "../api/axiosServer";
import useAuth from "./useAuth";

const REFRESH_PATH = "/api/auth/refresh/"

/** Returns an async function that when called will refresh access token. */
function useRefresh(): () => Promise<string | undefined> {
    const { setAccessToken } = useAuth();

    const refresh = useCallback(async () => {
        try {
            const {data} = await axiosServer.post(REFRESH_PATH, {}, { withCredentials: true });
            setAccessToken(data.access);
            return data.access;
        } catch (err) {
            console.error(err);
        }
    }, [setAccessToken])

    return refresh;
}

export default useRefresh;