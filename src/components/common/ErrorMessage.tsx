import './ErrorMessage.css'

interface ErrorMessageProps {
    errMsg: string | undefined
}

/**
 * React component to create an error message if it exists.
 */
function ErrorMessage({errMsg}: ErrorMessageProps) {
    return (
        <>
            {errMsg && (<div className="error-message">{errMsg}</div>)}
        </>
    )
}

export default ErrorMessage