import { useTranslation } from "react-i18next"
import './NotFound.css'

function NotFound() {
  const {t} = useTranslation();
  return (
    <div className="not-found" data-testid="NotFound">
        <h1>{t("not_found.title")}</h1>
        <p>{t("not_found.description")}</p>
    </div>
  )
}

export default NotFound
