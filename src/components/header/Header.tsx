import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import './Header.css'
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

function Header() {
    const {t} = useTranslation();
    const {accessToken} = useAuth();

    return (
        <header>
            <Link className='header-logo' to={"/"}>InterviewHelper</Link>
            <div className='header-buttons-section' data-testid='Header'>
                <div className='header-nav-buttons'>
                    <Link to="/interview/">{t("interview")}</Link>
                    {
                        accessToken ? 
                        <>
                            <Link to="/account/">{t("account")}</Link>
                            <Link to="/history/">{t("history")}</Link>
                            <Link to="/logout/">{t("logout")}</Link>
                        </> 
                        : 
                        <Link to="/login/">{t("login")}</Link>
                    }
                </div>
                <LangToggle />
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header;