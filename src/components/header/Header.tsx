import { Link } from 'react-router-dom';
import ThemeToggle from '../navbar/ThemeToggle';
import './Header.css'

function Header() {
    return (
        <header>
            <Link className='header-logo' to={"/"}>InterviewHelper</Link>
            <div className='header-buttons-section'>
                <div className='header-nav-buttons'>
                    <Link to="/interview/setup">Interview</Link>
                    <Link to="/login">Login</Link>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header;