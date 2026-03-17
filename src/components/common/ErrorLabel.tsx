import './ErrorLabel.css'

interface ErrorLabelProps {
    children: React.ReactNode
}

function ErrorLabel({children}: ErrorLabelProps) {
    return (
        <div className="error-label">{children}</div>
    )
}

export default ErrorLabel;