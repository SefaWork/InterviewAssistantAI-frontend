import { createContext } from "react";

export interface ThemeContextType {
    darkMode: boolean,
    toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext;