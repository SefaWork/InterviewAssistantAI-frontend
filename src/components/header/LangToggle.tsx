import { useTranslation } from 'react-i18next'
import './LangToggle.css'

/**
 * React component for language toggle. 
 * @author SefaWork
 * */
function LangToggle() {
    const {i18n} = useTranslation();

    /**Cycles through the supportedLngs array. */
    const changeLang = () => {
        const currentLang = i18n.language;
        const languages = i18n.options.supportedLngs;

        if (!languages) throw new Error("supportedLngs not defined.");

        const availableLanguages = languages.filter(lng => lng !== "cimode");
        const currentIndex = availableLanguages.indexOf(currentLang) + 1;

        if (currentIndex === 0) {
            console.warn(`Current language "${i18n.language}" is invalid, switching to default.`);
            i18n.changeLanguage(availableLanguages[0])
            return;
        }

        if (currentIndex >= languages.length - 1) {
            i18n.changeLanguage(availableLanguages[0])
        } else {
            i18n.changeLanguage(availableLanguages[currentIndex])
        }
    }

    return (
        <div 
            className='lang-toggle-container'
            onClick={changeLang}
        >
        {i18n.language.toUpperCase()}
        </div>
    )
}

export default LangToggle