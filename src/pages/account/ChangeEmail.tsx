import { useRef, useState, type FormEvent } from "react";
import FormEmailField from "../../components/form/FormEmailField";
import FormSubmit from "../../components/form/FormSubmit";
import { useTranslation } from "react-i18next";
import FormPasswordField from "../../components/form/FormPasswordField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CHANGE_EMAIL_PATH = "/api/account/change-email/"

function ChangeEmail() {
    // Small component that is meant to be rendered in the AccountSettings parent component.
    const {t} = useTranslation();
    const [processing, setProcessing] = useState<boolean>(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newEmailRef = useRef<HTMLInputElement>(null);
    const axiosServer = useAxiosPrivate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const givenPassword = passwordRef.current?.value
        const givenEmail = newEmailRef.current?.value

        if (!givenPassword || !givenEmail) throw new Error("Both fields are required.");
        if (processing) return;
        setProcessing(true)

        try {
            const { data } = await axiosServer.post(CHANGE_EMAIL_PATH, {"password": givenPassword, "new_email": givenEmail});
            if (!data) throw new Error("Failed to change e-mail.");
        } catch(err) {
            console.error(err)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <>
            <h1>{t("account_settings_page.change_email")}</h1>
            <form onSubmit={handleSubmit}>
                <FormEmailField id="new-email" label={t("field.new_email")} ref={newEmailRef} />
                <FormPasswordField id="password" label={t("field.password")} ref={passwordRef} />
                <FormSubmit text={t("confirm")} />
            </form>
        </>
    )
}

export default ChangeEmail;