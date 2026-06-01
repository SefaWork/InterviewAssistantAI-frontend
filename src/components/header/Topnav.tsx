import { Link } from 'react-router-dom'
import './Topnav.css'
import { useTranslation } from 'react-i18next'
import useAuth from '../../hooks/useAuth';

function Topnav() {
    const {t} = useTranslation();
    const {accessToken} = useAuth();

    return (
        <div className='topnav-container'>
            <Link to="/">{t("home")}</Link>
            <Link to="/about/">{t("about")}</Link>
            <div className='topnav-mobile'>
                <Link to="/interview/">{t("interview")}</Link>
                {accessToken? <>
                    <Link to="/account/">{t("account")}</Link>
                    <Link to="/history/">{t("history")}</Link>
                    <Link to="/logout/">{t("logout")}</Link>
                </> : <Link to="/login/">{t("login")}</Link>}
            </div>
        </div>
    )
}

export default Topnav