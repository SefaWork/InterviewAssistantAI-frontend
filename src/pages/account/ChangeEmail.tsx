import { useRef, type FormEvent } from "react";
import FormEmailField from "../../components/form/FormEmailField";
import FormSubmit from "../../components/form/FormSubmit";
import { useTranslation } from "react-i18next";

function ChangeEmail() {
    // Small component that is meant to be rendered in the AccountSettings parent component.
    const {t} = useTranslation();
    const curEmailRef = useRef<HTMLInputElement>(null);
    const newEmailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Waiting for API.
    }

    return (
        <>
            <h1>{t("account_settings_page.change_email")}</h1>
            <form onSubmit={handleSubmit}>
                <FormEmailField id="current-email" label={t("field.current_email")} ref={curEmailRef} />
                <FormEmailField id="new-email" label={t("field.new_email")} ref={newEmailRef} />
                <FormSubmit text={t("confirm")} />
            </form>
        </>
    )
}

export default ChangeEmail;