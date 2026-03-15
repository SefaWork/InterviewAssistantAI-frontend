import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'
import Detector from 'i18next-browser-languagedetector'

i18n
    .use(Detector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: ["en", "tr"],
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"]
        },
        debug: true
    })

export default i18n;