import type { FormEventHandler } from 'react'
import './Form.css'

interface FormProps {
    /**Name of the form. Creates a h1 with the name if provided. */
    formTitle?: string,
    onSubmit?: FormEventHandler<HTMLFormElement>,
    children: React.ReactNode
}

function Form({formTitle, onSubmit, children}: FormProps) {
    return (
        <div className='form-container' data-testid='Form'>
            {formTitle && <h1>{formTitle}</h1>}
            <form className='form' onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

export default Form