import type { PropsWithChildren } from 'react';
import './Form.css'

interface FormProps extends PropsWithChildren {
    /**Name of the form. Creates a h1 with the name if provided. */
    formTitle?: string
}

function Form({formTitle, children}: FormProps) {
    return (
        <div className='form-container' data-testid='Form'>
            {formTitle && <h1>{formTitle}</h1>}
            <form className='form'>
                {children}
            </form>
        </div>
    )
}

export default Form