import { useRef, type FormEvent } from "react";
import FormEmailField from "../../components/form/FormEmailField";
import FormSubmit from "../../components/form/FormSubmit";

function ChangeEmail() {
    // Small component that is meant to be rendered in the AccountSettings parent component.
    const curEmailRef = useRef<HTMLInputElement>(null);
    const newEmailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Waiting for API.
    }

    return (
        <>
            <h1>Change E-Mail</h1>
            <form onSubmit={handleSubmit}>
                <FormEmailField id="current-email" label="Current E-Mail" ref={curEmailRef} />
                <FormEmailField id="new-email" label="New E-Mail" ref={newEmailRef} />
                <FormSubmit text="Change E-Mail" />
            </form>
        </>
    )
}

export default ChangeEmail;