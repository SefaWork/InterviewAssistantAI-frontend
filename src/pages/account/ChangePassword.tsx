import { useRef, useState, type FormEvent } from "react";
import FormPasswordField from "../../components/form/FormPasswordField";
import FormSubmit from "../../components/form/FormSubmit";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CHANGE_PASSWORD_PATH = "/api/account/change-password"

function ChangePassword() {
    // Child componenent to be rendered under ACccountSettings component.
    const {t} = useTranslation();

    const curPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const repPasswordRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const axiosServer = useAxiosPrivate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const givenPassword = curPasswordRef.current?.value
        const givenNewPassword = newPasswordRef.current?.value
        const givenRepPassword = repPasswordRef.current?.value

        if (!givenPassword || !givenNewPassword || !givenRepPassword) throw new Error("All fields are required.");
        if (givenNewPassword !== givenRepPassword) throw new Error("Passwords don't match.");
        if (processing) return;
        setProcessing(true)

        try {
            const { data } = await axiosServer.post(CHANGE_PASSWORD_PATH, {"current_password": givenPassword, "new_password": givenNewPassword});
            if (!data) throw new Error("Failed to change password.");
        } catch(err) {
            console.error(err)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <>
            <h1>{t("account_settings_page.change_password")}</h1>
            <form onSubmit={handleSubmit}>
                <FormPasswordField id="cur_password" label={t("field.current_password")} ref={curPasswordRef} />
                <FormPasswordField id="new_password" label={t("field.new_password")} ref={newPasswordRef} />
                <FormPasswordField id="rep_password" label={t("field.repeat_password")} ref={repPasswordRef} />
                <FormSubmit text={t("confirm")} />
            </form>
        </>
    )
}

export default ChangePassword;