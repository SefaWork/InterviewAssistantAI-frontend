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
            {accessToken? <Link className="topnav-mobile" to="/logout/">{t("logout")}</Link> : <Link className="topnav-mobile" to="/login/">{t("login")}</Link>}
            <Link className="topnav-mobile" to="/interview/">{t("interview")}</Link>
        </div>
    )
}

export default Topnav