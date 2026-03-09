import FormField from './FormField'

interface FormPasswordField {
    id: string,
    label?: string,
    error?: string,

    max?: number,
    min?: number,

    ref?: React.RefObject<HTMLInputElement | null>
}

function FormPasswordField({id, label, error, max, min, ref} : FormPasswordField) {
    return (
        <FormField id={id} label={label} error={error}>
            <input
                className='form-password-input'
                type='password'
                id={id}
                inputMode='text'
                maxLength={max ?? 32}
                autoComplete='current-password'
                minLength={min ?? 8}
                placeholder={"*********"}
                ref={ref}
                required
            />
        </FormField>
    )
}

export default FormPasswordField