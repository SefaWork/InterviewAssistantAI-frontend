import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import './AccountSettings.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type AccountSettingsPageState = "main" | "change-password" | "change-email" | "delete-account";

function AccountSettings() {
    // Set e-mail, set password, delete account.
    const [pageState, setPageState] = useState<AccountSettingsPageState>("main");
    const {t} = useTranslation();

    return (
        <div className='account-settings-main'>
            <div className={`settings-window ${pageState}`}>
                {pageState === "main" && (
                    <>
                        <h1>{t("account_settings_page.account_settings")}</h1>
                        <Link className='settings-button button primary large' to={'/history/'}>{t("interview_history.title")}</Link>
                        <button className='settings-button button primary large' onClick={() => setPageState('change-email')}>{t("account_settings_page.change_email")}</button>
                        <button className='settings-button button primary large' onClick={() => setPageState('change-password')}>{t("account_settings_page.change_password")}</button>
                        <button className='settings-button button danger large' onClick={() => setPageState('delete-account')}>{t("account_settings_page.delete_account")}</button>
                    </>
                )}
                {pageState === "change-email" && (<ChangeEmail />)}
                {pageState === "change-password" && (<ChangePassword />)}
                {pageState === "delete-account" && (<DeleteAccount />)}
            </div>
            {pageState !== "main" && (
                    <a style={{
                        borderRadius:"2rem",
                        marginTop:"1rem",
                        padding: ".5rem 1rem"
                    }} className='button primary' onClick={() => setPageState('main')}>&lt; {t("back")}</a>
            )}
        </div>
    )
}

export default AccountSettings;