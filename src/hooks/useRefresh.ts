import axiosServer from "../api/axiosServer";
import useAuth from "./useAuth";

const REFRESH_PATH = "/api/auth/refresh/"

/** Returns an async function that when called will refresh access token. */
function useRefresh(): () => Promise<string | undefined> {
    const { setAccessToken } = useAuth();

    return async () => {
        try {
            const {data} = await axiosServer.post(REFRESH_PATH, {}, { withCredentials: true });
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (err) {
            console.log(err);
        }
    }
}

export default useRefresh;