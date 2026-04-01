import useAuth from "../../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const {accessToken} = useAuth();
    const location = useLocation();
    
    if (!accessToken) return <Navigate to={'/login'} state={{from: location}} replace />
    return <Outlet />
}

export default RequireAuth