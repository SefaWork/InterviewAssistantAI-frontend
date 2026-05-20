import type { FormEvent } from "react";
import FormPasswordField from "../../components/form/FormPasswordField";

function DeleteAccount() {
   // Child component to be rendered under the AccountSettings component.
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <>
            <h1>Delete Account</h1>
            <p>Type in your password to the box below only if you are sure about deleting your account. <b>This action is irreversible!</b></p>
            <form onSubmit={handleSubmit}>
                <FormPasswordField id="password" />
                <button type="submit" className="account-deletion-btn">Confirm Account Deletion</button>
            </form>
        </>
    )
}

export default DeleteAccount;