import { useContext } from "react"
import PreferenceContext from "../context/PreferenceContext"

function usePreference() {
    const preference = useContext(PreferenceContext);
    if (!preference) throw new Error("This component requires PreferenceContext to function.");
    return preference;
}

export default usePreference