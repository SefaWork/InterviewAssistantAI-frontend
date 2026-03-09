import './FormField.css'

interface FormFieldProps {
    id: string,
    label?: string,
    error?: string,
    children: React.ReactNode
}

/**Used for input fields. Intended to be used inside of a Form. */
function FormField({id, label, children, error} : FormFieldProps) {
    return (
        <div className='form-field'>
            {label && (<label htmlFor={id}>{label}</label>)}
            {children}
            {error && (<p className='form-field-error'>{error}</p>)}
        </div>
    )
}

export default FormField