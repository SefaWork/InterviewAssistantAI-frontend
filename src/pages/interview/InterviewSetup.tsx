import { useRef, useState } from "react"
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import './InterviewSetup.css'
import Popup from "../../components/common/Popup";
import axios from "axios";

const SESSION_CREATE_PATH = "/api/interview/create/"
const SESSION_FORCE_CREATE_PATH = "/api/interview/forcecreate/"

function InterviewSetup() {
    const {t} = useTranslation();
    const [ready, setReady] = useState<boolean>(false);
    const navigate = useNavigate();
    const axiosServer = useAxiosPrivate();
    const creatingRef = useRef<boolean>(false);

    const [existingSession, setExistingSession] = useState<boolean>(false);
    
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

            axiosServer.post(SESSION_CREATE_PATH)
            .then(() => navigate(`/interview/session/`))
            .catch((err) => {
                if (axios.isAxiosError(err) && err.status === 409)
                    setExistingSession(true);
                else
                    console.error(err);

                creatingRef.current = false;
            })
        }
    }

    const closePopup = () => {
        setExistingSession(false);
    }

    const continueOldSession = () => {
        navigate(`/interview/session/`);
    }

    const startNewSession = () => {
        if (creatingRef.current) return;
        creatingRef.current = true;

        axiosServer.post(SESSION_FORCE_CREATE_PATH)
        .then(() => navigate('/interview/session/'))
        .catch((err) => {
            console.error(err);
            creatingRef.current = false;
        })
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
            {existingSession && (
                <Popup onClose={closePopup}>
                    <div style={{
                        fontSize: "larger",
                        marginBottom: "1rem"
                    }}>
                        {t("interview_setup.existing_interview")}
                    </div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        gap: "1rem"
                    }}>
                        <button type="button" className="button success large" onClick={continueOldSession}>{t("interview_setup.continue_session")}</button>
                        <button type="button" className="button danger large" onClick={startNewSession}>{t("interview_setup.delete_session")}</button>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default InterviewSetup