import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css'
import LangToggle from './LangToggle';

function Header() {
    return (
        <header>
            <Link className='header-logo' to={"/"}>InterviewHelper</Link>
            <div className='header-buttons-section' data-testid='Header'>
                <div className='header-nav-buttons'>
                    <Link to="/interview/setup">Interview</Link>
                    <Link to="/login">Login</Link>
                </div>
                <LangToggle />
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header;