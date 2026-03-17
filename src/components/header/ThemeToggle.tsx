import { useContext } from 'react'
import PreferenceContext from '../../context/PreferenceContext'

import LightModeIcon from '../../assets/brightness-high.svg'
import DarkModeIcon from '../../assets/moon.svg'

import DarkModeHoverIcon from '../../assets/moon-fill.svg'
import LightModeHoverIcon from '../../assets/brightness-high-fill.svg'

import './ThemeToggle.css'

/**
 * React component for Dark Mode toggle. 
 * @author SefaWork
 * */
function ThemeToggle() {
    // Local storage dark mode state.
    const context = useContext(PreferenceContext);
    if (!context) {
        throw new Error("PreferenceContext is required to render this component.")
    }

    return (
        <div 
            className='theme-toggle-container'
            onClick={context.toggleDarkMode}
        >
        <img src={context.darkMode? DarkModeIcon : LightModeIcon} className='theme-toggle'></img>
        <img src={context.darkMode? DarkModeHoverIcon : LightModeHoverIcon} className='theme-toggle-hover'></img>
        </div>
    )
}

export default ThemeToggle