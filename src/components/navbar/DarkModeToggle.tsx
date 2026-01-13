import './DarkModeToggle.css'

import LightModeHover from '../../assets/brightness-high-fill.svg'
import LightMode from '../../assets/brightness-high.svg'

import DarkModeHover from '../../assets/moon-fill.svg'
import DarkMode from '../../assets/moon.svg'

/**
 * React component for Dark Mode toggle. 
 * @author SefaWork
 * */
function DarkModeToggle({setDarkMode, darkMode}: {setDarkMode: () => void, darkMode: boolean}) {
    return (
        <label className='dark-mode-toggle-container'>
            <input 
                type="checkbox" 
                id="dark-mode-toggle" 
                className='dark-mode-toggle' 
                checked={darkMode}
                onChange={setDarkMode}
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