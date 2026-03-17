import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PreferenceContext, { type PreferenceContextType } from "./PreferenceContext";

const DARK_MODE_STORAGE_KEY = "dark-mode";

interface PreferenceProviderProps {
    children: React.ReactNode
}

function PreferenceProvider({children}: PreferenceProviderProps) {
    // Local storage dark mode state.
    const [darkModeStorage, setDarkModeStorage] = useState<boolean | null>(() => {
        const item = localStorage.getItem(DARK_MODE_STORAGE_KEY)
        if (item === null) return null;
        return JSON.parse(item);
    });
    
    // State that changes on prefers-color-scheme media query update.
    const prefersDarkMode = useMediaQuery(
        {query: "(prefers-color-scheme: dark)"}
    )

    const toggleDarkMode = () => {
        const darkMode = darkModeStorage === null? prefersDarkMode : darkModeStorage;
        setDarkModeStorage(!darkMode)
    }

    // Updates local storage.
    useEffect(() => {
        if (darkModeStorage === null) {
            localStorage.removeItem(DARK_MODE_STORAGE_KEY)
        } else {
            localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(darkModeStorage))
        }
    }, [darkModeStorage])

    // Update body.
    useEffect(() => {
        if (darkModeStorage === null ? prefersDarkMode : darkModeStorage) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkModeStorage, prefersDarkMode]);

    const contextData: PreferenceContextType = {
        darkMode: darkModeStorage === null? prefersDarkMode : darkModeStorage,
        toggleDarkMode
    }

    return (
        <PreferenceContext.Provider value={contextData}>
            {children}
        </PreferenceContext.Provider>
    )
}

export default PreferenceProvider;