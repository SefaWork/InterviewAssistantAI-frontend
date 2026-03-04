import './DarkModeToggle.css'

import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'

/**
 * React component for Dark Mode toggle. 
 * @author SefaWork
 * */
function DarkModeToggle() {
    // Local storage dark mode state.
    const context = useContext(ThemeContext);
    if (!context) return;

    return (
        <button className='dark-mode-toggle' onClick={context.toggleDarkMode} />
    )
}

export default DarkModeToggle