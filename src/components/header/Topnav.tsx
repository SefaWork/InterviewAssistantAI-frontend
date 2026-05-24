import { Link } from 'react-router-dom'
import './Topnav.css'
import { useTranslation } from 'react-i18next'

function Topnav() {
    const {t} = useTranslation();

    return (
        <div className='topnav-container'>
            <Link to="/">{t("home")}</Link>
            <Link to="/about/">{t("about")}</Link>
            <Link className="topnav-mobile" to="/login/">{t("login")}</Link>
            <Link className="topnav-mobile" to="/interview/">{t("interview")}</Link>
        </div>
    )
}

export default Topnav