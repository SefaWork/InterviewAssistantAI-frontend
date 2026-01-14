import './Form.css'
import type React from 'react';

function Form({formTitle, children}: {formTitle?: string, children: React.ReactNode}) {
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