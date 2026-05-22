import { useRef, useState } from "react"
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import './InterviewSetup.css'
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SESSION_CREATE_PATH = "/api/interview/create/"

function InterviewSetup() {
    const {t} = useTranslation();
    const [ready, setReady] = useState<boolean>(false);
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const creatingRef = useRef<boolean>(false);
    
    const handleUserMedia = () => {
        setReady(true);
    }

    const handleMediaError = () => {
        setReady(false);
    }

    const handleClick = async () => {
        if (ready) {
            if (creatingRef.current) return;
            creatingRef.current = true;

            try {
                const response = await axios.post(SESSION_CREATE_PATH);
                const id = response.data?.id as number | undefined;

                if (!id) throw new Error("Failed to create interview session.");

                navigate(`/interview/${id}`)
            } catch(err) {
                creatingRef.current = false;
                console.error(err);
            }
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