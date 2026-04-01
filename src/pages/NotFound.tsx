import { useTranslation } from "react-i18next"
import './NotFound.css'
import useRefresh from "../hooks/useRefresh";

function NotFound() {
  const {t} = useTranslation();
  const refresh = useRefresh();

  return (
    <div className="not-found" data-testid="NotFound">
        <h1>{t("not_found.title")}</h1>
        <p>{t("not_found.description")}</p>
        <button onClick={refresh}>Refresh Token</button>
    </div>
  )
}

export default NotFound
