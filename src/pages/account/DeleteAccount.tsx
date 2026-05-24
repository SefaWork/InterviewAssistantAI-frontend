import { useRef, type FormEvent } from "react";
import FormPasswordField from "../../components/form/FormPasswordField";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DELETE_ACCOUNT_PATH = '/api/account/delete-account/'

function DeleteAccount() {
    // Child component to be rendered under the AccountSettings component.
    const {t} = useTranslation();
    const passwordRef = useRef<HTMLInputElement>(null);
    const axiosServer = useAxiosPrivate();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const givenPassword = passwordRef.current?.value
        if (!givenPassword) return;

        try {
            await axiosServer.post(DELETE_ACCOUNT_PATH, {"password": givenPassword});
            auth.setAccessToken(undefined);
            navigate('/')
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>{t("account_settings_page.delete_account")}</h1>
            <p>{t("account_settings_page.confirmation_text")} <b>{t("account_settings_page.deletion_warning")}</b></p>
            <form onSubmit={handleSubmit}>
                <FormPasswordField id="password" ref={passwordRef} />
                <button type="submit" className="account-deletion-btn">{t("confirm")}</button>
            </form>
        </>
    )
}

export default DeleteAccount;