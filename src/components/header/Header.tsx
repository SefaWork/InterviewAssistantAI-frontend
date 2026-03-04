import { Link } from 'react-router-dom';
import ThemeToggle from '../navbar/ThemeToggle';
import './Header.css'

function Header() {
    return (
        <header>
            <Link className='header-logo' to={"/"}>InterviewHelper</Link>
            <div className='header-buttons-section'>
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header;