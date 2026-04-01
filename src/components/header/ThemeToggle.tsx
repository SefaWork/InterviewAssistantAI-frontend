import LightModeIcon from '../../assets/brightness-high.svg'
import DarkModeIcon from '../../assets/moon.svg'

import DarkModeHoverIcon from '../../assets/moon-fill.svg'
import LightModeHoverIcon from '../../assets/brightness-high-fill.svg'

import './ThemeToggle.css'
import usePreference from '../../hooks/usePreference'

/**
 * React component for Dark Mode toggle. 
 * @author SefaWork
 * */
function ThemeToggle() {
    const context = usePreference();

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