import './Navbar.css'
import DarkModeToggle from './DarkModeToggle'

function Navbar({setDarkMode, darkMode}: {setDarkMode: () => void, darkMode: boolean}) {
    return (
        <section className="navbar">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </section>
    )
}

export default Navbar