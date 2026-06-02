import { useTranslation } from 'react-i18next';
import Interview1Image from '../../assets/interview_1.jpg'
import './About.css'

function About() {
    const {t} = useTranslation();

    const features = (t("about_page.features", {returnObjects: true}) || []) as string[];

    return (
        <div className="about-page">
            <div style={{animationDelay:"300ms"}} className='image-text-wrapper left'>
                <img src={Interview1Image}></img>
                <div>
                    <h1>{t("about_page.about_title")}</h1>
                    <p>{t("about_page.about_paragraph")}</p>
                </div>
            </div>
            <div style={{animationDelay:"600ms"}} className='image-text-wrapper right'>
                <div>
                    <h1>{t("about_page.reasoning_title")}</h1>
                    <p>{t("about_page.reasoning_paragraph")}</p>
                </div>
                <img src={Interview1Image}></img>
            </div>
            <div style={{animationDelay:"900ms"}} className='image-text-wrapper left'>
                <img src={Interview1Image}></img>
                <div>
                    <h1>{t("about_page.features_title")}</h1>
                    <ul>
                        {features.map(x => (<li key={x}>{x}</li>))}
                    </ul>
                </div>
            </div>
        </div>
    )   
}

export default About;