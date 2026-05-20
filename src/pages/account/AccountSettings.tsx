import { useEffect, useState } from 'react';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import './AccountSettings.css'
import { useTranslation } from 'react-i18next';

export type AccountSettingsPageState = "main" | "change-password" | "change-email" | "delete-account";

function AccountSettings() {
    // Set e-mail, set password, delete account.
    const [pageState, setPageState] = useState<AccountSettingsPageState>("main");
    const {t} = useTranslation();

    useEffect(() => {
        console.log("Doing stuff...");
    })

    return (
        <div className='account-settings-main'>
            <div className={`settings-window ${pageState}`}>
                {pageState === "main" && (
                    <>
                        <h1>{t("account_settings_page.account_settings")}</h1>
                        <button className='settings-button primary' onClick={() => setPageState('change-email')}>{t("account_settings_page.change_email")}</button>
                        <button className='settings-button primary' onClick={() => setPageState('change-password')}>{t("account_settings_page.change_password")}</button>
                        <button className='settings-button danger' onClick={() => setPageState('delete-account')}>{t("account_settings_page.delete_account")}</button>
                    </>
                )}
                {pageState === "change-email" && (<ChangeEmail />)}
                {pageState === "change-password" && (<ChangePassword />)}
                {pageState === "delete-account" && (<DeleteAccount />)}
                {pageState !== "main" && (
                    <a className='back-btn' onClick={() => setPageState('main')}>{t("back")}</a>
                )}
            </div>
        </div>
    )
}

export default AccountSettings;