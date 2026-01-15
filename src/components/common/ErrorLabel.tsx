import './ErrorLabel.css'

interface ErrorLabelProps {
    errMsg: string | undefined
}

/**
 * React component to create an error message if it exists.
 */
function ErrorLabel({errMsg}: ErrorLabelProps) {
    return (
        <>
            {errMsg && (<p className="error-label">{errMsg}</p>)}
        </>
    )
}

export default ErrorLabel