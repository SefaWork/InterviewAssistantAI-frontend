import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import './Header.css'
import { useTranslation } from 'react-i18next';

function Header() {
    const {t} = useTranslation();

    return (
        <header>
            <Link className='header-logo' to={"/"}>InterviewHelper</Link>
            <div className='header-buttons-section' data-testid='Header'>
                <div className='header-nav-buttons'>
                    <Link to="/interview/">{t("interview")}</Link>
                    <Link to="/login">{t("login")}</Link>
                </div>
                <LangToggle />
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header;