import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'

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
    const context = useContext(ThemeContext);
    if (!context) return;

    const [imgSrc, setImgSrc] = useState<[string, string]>([LightModeIcon, LightModeHoverIcon]);

    useEffect(() => {
        if (context.darkMode) {
            setImgSrc([DarkModeIcon, DarkModeHoverIcon])
        } else {
            setImgSrc([LightModeIcon, LightModeHoverIcon])
        }
    }, [context.darkMode])

    return (
        <div 
            className='theme-toggle-container'
            onClick={context.toggleDarkMode}
        >
        <img src={imgSrc[0]} className='theme-toggle'></img>
        <img src={imgSrc[1]} className='theme-toggle-hover'></img>
        </div>
    )
}

export default ThemeToggle