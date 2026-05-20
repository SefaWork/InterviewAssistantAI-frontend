import { useRef, type FormEvent } from "react";
import FormPasswordField from "../../components/form/FormPasswordField";
import FormSubmit from "../../components/form/FormSubmit";

function ChangePassword() {
    // Child componenent to be rendered under ACccountSettings component.

    const curPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const repPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Waiting for API.
    }

    return (
        <>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <FormPasswordField id="cur_password" label="Current Password" ref={curPasswordRef} />
                <FormPasswordField id="new_password" label="New Password" ref={newPasswordRef} />
                <FormPasswordField id="rep_password" label="Repeat Password" ref={repPasswordRef} />
                <FormSubmit text="Change Password" />
            </form>
        </>
    )
}

export default ChangePassword;