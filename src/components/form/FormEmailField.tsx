import FormField from './FormField'

interface FormEmailField {
    id: string,
    label?: string,
    error?: string,
    ref?: React.RefObject<HTMLInputElement | null>
}

/**FormField suited for e-mail input. Intended to be used inside of a Form. */
function FormEmailField({id, label, error, ref}: FormEmailField) {
    return (
        <FormField id={id} label={label} error={error}>
            <input 
                className='form-email-input' 
                type='email' 
                id={id} 
                inputMode='email' 
                autoComplete='email' 
                maxLength={254} 
                placeholder='e.g. example@email.com'
                ref={ref}   
                required 
            />
        </FormField>
    )
}

export default FormEmailField