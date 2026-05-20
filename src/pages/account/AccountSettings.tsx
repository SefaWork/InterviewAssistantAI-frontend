import { useEffect, useState } from 'react';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import './AccountSettings.css'

export type AccountSettingsPageState = "main" | "change-password" | "change-email" | "delete-account";

function AccountSettings() {
    // Set e-mail, set password, delete account.
    const [pageState, setPageState] = useState<AccountSettingsPageState>("main");

    useEffect(() => {
        console.log("Doing stuff...");
    })

    return (
        <div className='account-settings-main'>
            <div className={`settings-window ${pageState}`}>
                {pageState === "main" && (
                    <>
                        <h1>Account Settings</h1>
                        <button className='settings-button primary' onClick={() => setPageState('change-email')}>Change E-Mail</button>
                        <button className='settings-button primary' onClick={() => setPageState('change-password')}>Change Password</button>
                        <button className='settings-button danger' onClick={() => setPageState('delete-account')}>Delete Account</button>
                    </>
                )}
                {pageState === "change-email" && (<ChangeEmail />)}
                {pageState === "change-password" && (<ChangePassword />)}
                {pageState === "delete-account" && (<DeleteAccount />)}
                {pageState !== "main" && (
                    <button onClick={() => setPageState('main')}>Back</button>
                )}
            </div>
        </div>
    )
}

export default AccountSettings;