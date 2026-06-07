import { useTranslation } from 'react-i18next';
import Interview1Image from '../../assets/interview_1.jpg';
import Interview2Image from '../../assets/interview_2.jpg';
import Interview3Image from '../../assets/interview_3.jpg';
import Interview4Image from '../../assets/interview_4.jpg';
import useEmotionWeights from '../../hooks/useEmotionWeights';
import { useEffect, useMemo } from 'react';
import { EMOTIONS } from '../../types/emotion';
import './About.css'

function About() {
    const {t} = useTranslation();
    const emotionWeights = useEmotionWeights();
    const translatedWeights = useMemo<string[]>(() => {
        return EMOTIONS.map(emotionName => `${t(`emotion.${emotionName}`)}: ${t("percentage_sign", {value: emotionWeights[emotionName]})}`)
    }, [emotionWeights, t])

    const features = (t("about_page.features", {returnObjects: true}) || []) as string[];

    // In your /about/ page component
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="about-page">
            <div style={{animationDelay:"100ms"}} className='image-text-wrapper left'>
                <img src={Interview1Image}></img>
                <div>
                    <h1>{t("about_page.about_title")}</h1>
                    <p>{t("about_page.about_paragraph")}</p>
                </div>
            </div>
            <div style={{animationDelay:"200ms"}} className='image-text-wrapper right'>
                <div>
                    <h1>{t("about_page.reasoning_title")}</h1>
                    <p>{t("about_page.reasoning_paragraph")}</p>
                </div>
                <img src={Interview2Image}></img>
            </div>
            <div style={{animationDelay:"200ms"}} className='image-text-wrapper left'>
                <img src={Interview3Image}></img>
                <div>
                    <h1>{t("about_page.features_title")}</h1>
                    <ul>
                        {features.map(x => (<li key={x}>{x}</li>))}
                    </ul>
                </div>
            </div>
            <div style={{animationDelay:"100ms"}} id="scoring-info" className='image-text-wrapper right'>
                <div>
                    <h1>{t("about_page.scoring_title")}</h1>
                    <p>{t("about_page.scoring_paragraph")}</p>
                    <ul>
                        {translatedWeights.map(x => (<li key={x}>{x}</li>))}
                    </ul>
                </div>
                <img src={Interview4Image}></img>
            </div>
        </div>
    )   
}

export default About;