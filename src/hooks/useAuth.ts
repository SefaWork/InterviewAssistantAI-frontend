import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function useAuth() {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error("This component requires AuthContext to function.");
    return auth;
}

export default useAuth;