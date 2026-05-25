import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const LOGOUT_PATH = '/api/auth/logout/'

function Logout() {
    const {t} = useTranslation();
    const {setAccessToken} = useAuth();
    const axiosServer = useAxiosPrivate();
    const [loggedOut, setLoggedOut] = useState<boolean>(false);

    useEffect(() => {
        let abortController = new AbortController()
        axiosServer.post(LOGOUT_PATH, undefined, {signal: abortController.signal})
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            if (abortController.signal.aborted) return;
            setAccessToken(undefined)
            setLoggedOut(true)
        })
        return () => abortController.abort()
    }, [axiosServer, setAccessToken])

    if (loggedOut) return <Navigate to='/' state={{"logged_out": true}} replace />
    return <h1 style={{
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)"
    }}>{t("logout")}...</h1>
}

export default Logout