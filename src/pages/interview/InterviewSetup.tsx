import { useState } from "react"
import Webcam from "react-webcam";
import './InterviewSetup.css'
import { useNavigate } from "react-router-dom";


function InterviewSetup() {
    const [ready, setReady] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleUserMedia = () => {
        setReady(true);
    }

    const handleMediaError = () => {
        setReady(false);
    }

    const handleClick = () => {
        if (ready) {
            navigate('/interview')
        }
    }

    return (
        <div className="interview-setup-container">
            <h1>Camera Setup</h1>
            <p>InterviewHelper requires webcam permission in order to evaluate your non-verbal performance. Please enable webcam permission from browser settings.</p>
            <div className="camera-wrapper">
                <Webcam onUserMedia={handleUserMedia} onUserMediaError={handleMediaError} screenshotFormat='image/jpeg' videoConstraints={{facingMode: 'user'}} audio={false} mirrored />
            </div>
            <div className="webcam-ready-section">
                <div>{ready? "✅ Webcam is ready!" : "❌ Webcam is not ready."}</div>
                <button disabled={!ready} onClick={handleClick}>Start Interview</button>
            </div>
        </div>
    )
}

export default InterviewSetup