import { useState } from "react"
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import './InterviewSetup.css'
import { useTranslation } from "react-i18next";


function InterviewSetup() {
    const {t} = useTranslation();
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
            <h1>{t("interview_setup.title")}</h1>
            <p>{t("interview_setup.description")}</p>
            <div className="camera-wrapper">
                <Webcam onUserMedia={handleUserMedia} onUserMediaError={handleMediaError} screenshotFormat='image/jpeg' videoConstraints={{facingMode: 'user'}} audio={false} mirrored />
            </div>
            <div className="webcam-ready-section">
                <div>{ready? `✅ ${t("interview_setup.ready")}` : `❌ ${t("interview_setup.not_ready")}`}</div>
                <button disabled={!ready} onClick={handleClick}>{t("interview_setup.start")}</button>
            </div>
        </div>
    )
}

export default InterviewSetup