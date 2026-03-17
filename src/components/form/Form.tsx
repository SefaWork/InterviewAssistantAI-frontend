import type { FormEventHandler } from 'react'
import './Form.css'

interface FormProps {
    /**Name of the form. Creates a h1 with the name if provided. */
    formTitle?: string,

    /**Test ID used for unit testing purposes. */
    testId?: string,

    /**Set to true to use default HTML5 validation. (False puts noValidate tag in form.) */
    autoValidate?: boolean,

    /**onSubmit handler for the form. Recommended to prevent default behavior with event.preventDefault(). */
    onSubmit?: FormEventHandler<HTMLFormElement>,

    /**onInput handler for the form. Recommended to use this to clear errors. */
    onInput?: FormEventHandler<HTMLFormElement>,

    children: React.ReactNode
}

/**Creates a form that centers itself in a flexbox.*/
function Form({formTitle, onSubmit, onInput, children, autoValidate, testId = "Form"}: FormProps) {
    return (
        <div className='form-container' data-testid={testId}>
            {formTitle && <h1>{formTitle}</h1>}
            <form className='form' onSubmit={onSubmit} onInput={onInput} noValidate={!autoValidate}>
                {children}
            </form>
        </div>
    )
}

export default Form