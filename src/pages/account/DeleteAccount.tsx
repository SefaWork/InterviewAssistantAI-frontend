import type { FormEvent } from "react";
import FormPasswordField from "../../components/form/FormPasswordField";
import { useTranslation } from "react-i18next";

function DeleteAccount() {
    // Child component to be rendered under the AccountSettings component.
    const {t} = useTranslation();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <>
            <h1>{t("account_settings_page.delete_account")}</h1>
            <p>{t("account_settings_page.confirmation_text")} <b>{t("account_settings_page.deletion_warning")}</b></p>
            <form onSubmit={handleSubmit}>
                <FormPasswordField id="password" />
                <button type="submit" className="account-deletion-btn">{t("confirm")}</button>
            </form>
        </>
    )
}

export default DeleteAccount;