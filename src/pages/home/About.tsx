import { useTranslation } from 'react-i18next';
import './About.css'

function About() {
    const {t} = useTranslation();

    return (
        <div className="about-page">
            <h1>{t("about_page.objective_title")}</h1>
            <p>{t("about_page.objective")}</p>
            <h1>{t("about_page.features_title")}</h1>
            <ul>
                <li>{t("about_page.features.1")}</li>
                <li>{t("about_page.features.2")}</li>
                <li>{t("about_page.features.3")}</li>
                <li>{t("about_page.features.4")}</li>
                <li>{t("about_page.features.5")}</li>
            </ul>
        </div>
    )   
}

export default About;