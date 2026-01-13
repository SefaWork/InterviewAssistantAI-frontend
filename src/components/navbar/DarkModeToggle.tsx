import './DarkModeToggle.css'

import LightModeHover from '../../assets/brightness-high-fill.svg'
import LightMode from '../../assets/brightness-high.svg'

import DarkModeHover from '../../assets/moon-fill.svg'
import DarkMode from '../../assets/moon.svg'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

/**
 * React component for Dark Mode toggle. 
 * @author SefaWork
 * */
function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(true);

    const systemPrefersDark = useMediaQuery(
        {query: "(prefers-color-scheme: dark)"},
        undefined,
        (isSystemDark) => setDarkMode(isSystemDark)
    )

    useEffect(() => {
        if(darkMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <label className='dark-mode-toggle-container'>
            <input 
                type="checkbox" 
                id="dark-mode-toggle" 
                className='dark-mode-toggle' 
                checked={darkMode}
                onChange={(e) => setDarkMode(e.currentTarget.checked)}
            />
            {darkMode && <img
                src={DarkMode}
                onMouseOver={e => e.currentTarget.src = DarkModeHover}
                onMouseLeave={e => e.currentTarget.src = DarkMode}
            />}
            {!darkMode && <img 
                src={LightMode} 
                onMouseOver={e => e.currentTarget.src = LightModeHover}
                onMouseLeave={e => e.currentTarget.src = LightMode}
            />}
        </label>
    )
}

export default DarkModeToggle