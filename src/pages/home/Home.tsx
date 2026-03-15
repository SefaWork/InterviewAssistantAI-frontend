import './Home.css'
import HomeImage from '../../assets/home-image.jpg'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
    const {t} = useTranslation();
    
    return (
        <section className="hero-section">
            <img src={HomeImage} alt="Interview Assistant" className="hero-image" />
            <div className="hero-content fade-in">
                <h1 className="hero-title">{t("project.name")}</h1>
                <p className="hero-subtitle">
                    {t("project.slogan")}
                </p>
                <Link to={"/login"} className="hero-cta">{t("home.start")}</Link>
            </div>
        </section>
    )
}

export default Home;