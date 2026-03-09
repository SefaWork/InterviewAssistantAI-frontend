import './FormSubmit.css'

interface FormSubmitProps {
    text: string,
    disabled?: boolean
}

function FormSubmit({text, disabled}: FormSubmitProps) {
    return (
        <button type="submit" className="form-submit-btn" disabled={disabled}>{text}</button>
    )
}

export default FormSubmit