import './Form.css'

interface FormProps {
    /**Name of the form. Creates a h1 with the name if provided. */
    formTitle?: string,
    action?: (formData: FormData) => any | Promise<any>
    children: React.ReactNode
}

function Form({formTitle, action, children}: FormProps) {
    return (
        <div className='form-container' data-testid='Form'>
            {formTitle && <h1>{formTitle}</h1>}
            <form className='form' action={action}>
                {children}
            </form>
        </div>
    )
}

export default Form