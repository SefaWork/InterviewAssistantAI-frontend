import { createContext } from "react";

export interface PreferenceContextType {
    darkMode: boolean,
    toggleDarkMode: () => void
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);
export default PreferenceContext;