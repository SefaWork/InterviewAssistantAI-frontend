import useAuth from "../../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const {accessToken} = useAuth();
    const location = useLocation();

    if (accessToken) return <Outlet />
    return <Navigate to={'/login'} state={{from: location, expiredSession: true}} replace />
}

export default RequireAuth