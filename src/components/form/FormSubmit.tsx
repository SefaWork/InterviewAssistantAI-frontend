import ErrorLabel from '../common/ErrorLabel'
import './FormSubmit.css'

interface FormSubmitProps {
    text: string,
    error?: string,
    disabled?: boolean
}

/**Submit button intended to be used under Form. You can use button element directly, but this adds consistency to forms. */
function FormSubmit({text, error, disabled}: FormSubmitProps) {
    return (
        <>
            <button type="submit" className="form-submit-btn" disabled={disabled}>{text}</button>
            {error && (<ErrorLabel>{error}</ErrorLabel>)}
        </>
    )
}

export default FormSubmit