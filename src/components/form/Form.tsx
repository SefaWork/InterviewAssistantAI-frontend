import type { FormEventHandler } from 'react'
import './Form.css'

interface FormProps {
    /**Name of the form. Creates a h1 with the name if provided. */
    formTitle?: string,

    /**Test ID used for unit testing purposes. */
    testId?: string,

    /**Displays error when provided. */
    error?: string,

    /**onSubmit handler for the form. Recommended to prevent default behavior with event.preventDefault(). */
    onSubmit?: FormEventHandler<HTMLFormElement>,
    children: React.ReactNode
}

/**Creates a form that centers itself in a flexbox.*/
function Form({formTitle, onSubmit, children, error, testId = "Form"}: FormProps) {
    return (
        <div className='form-container' data-testid={testId}>
            {formTitle && <h1>{formTitle}</h1>}
            <form className='form' onSubmit={onSubmit}>
                {children}
                {error && <div className='form-error'>{error}</div>}
            </form>
        </div>
    )
}

export default Form