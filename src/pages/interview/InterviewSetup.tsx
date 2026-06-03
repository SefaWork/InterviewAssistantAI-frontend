import { useRef, useState } from "react"
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "axios";

import './InterviewSetup.css'

const SESSION_CREATE_PATH = "/api/interview/create/"

// @TODO Improve UI design.
// @TODO Add popup for continuing session.
function InterviewSetup() {
    const {t} = useTranslation();
    const [ready, setReady] = useState<boolean>(false);
    const navigate = useNavigate();
    const axiosServer = useAxiosPrivate();
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
                await axiosServer.post(SESSION_CREATE_PATH);
                navigate(`/interview/session/`)
            } catch(err) {
                console.error(err);

                if (axios.isAxiosError(err)) {
                    if (err.status === 409) {
                        navigate(`/interview/session/`)
                        return;
                    }
                }

                creatingRef.current = false;
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
                <button className="button success" disabled={!ready} onClick={handleClick}>{t("interview_setup.start")}</button>
            </div>
        </div>
    )
}

export default InterviewSetup