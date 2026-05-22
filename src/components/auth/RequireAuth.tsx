import useAuth from "../../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh";
import { useEffect, useState } from "react";

type AuthenticationState = "AUTHENTICATING" | "AUTHENTICATED" | "NOT_AUTHENTICATED"

function RequireAuth() {
    const {accessToken} = useAuth();
    const refreshToken = useRefresh();
    const location = useLocation();

    const [authenticationState, setAuthenticationState] = useState<AuthenticationState>(accessToken? "AUTHENTICATED" : "AUTHENTICATING");
    
    useEffect(() => {
        if (accessToken) return;

        let cancelled: boolean = false;

        refreshToken()
        .then((value) => {
            if (cancelled) return;
            if (value) return setAuthenticationState("AUTHENTICATED");
            setAuthenticationState("NOT_AUTHENTICATED");
        })
        .catch((err) => {
            if (cancelled) return;
            setAuthenticationState("NOT_AUTHENTICATED");
            console.error(new Error("Authentication using refresh token failed.", {cause: err}));
        })

        return () => {
            cancelled = true;
        }
    }, [accessToken, refreshToken])

    switch(authenticationState) {
        case "AUTHENTICATED":
            return <Outlet />;
        case "AUTHENTICATING":
            return <>Please wait...</>
        case "NOT_AUTHENTICATED":
            return <Navigate to={'/login'} state={{from: location, needsAuth: true}} replace />
    }
}

export default RequireAuth