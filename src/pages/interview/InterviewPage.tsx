import Webcam from 'react-webcam'
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useWebSocket from '../../hooks/useWebSocket';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './InterviewPage.css'

// 1 second / FPS
const SEND_INTERVAL = 1_000 / 5

type WebsocketResponseType = {
    type?: "result" | "session_complete",
    data?: {
        face_count: number,
        eye_contact_score: number,
        emotion: string,
        emotion_avg: number,
        eye_avg: number
    },
    id?: string
}

type TrackedScore = {
    eyeScore: number,
    emotionScore: number,
    emotion: string
}

type FieldStates =
    | "good"
    | "average"
    | "bad"

const scoreValueToState = (score: number): FieldStates => {
    if (score > 50) return "good"
    else if (score > 25) return "average"
    return "bad"
}

// @TODO Improve UI design.
// @TODO Add progress bar.
// @TODO Add confidence indicator.
function InterviewPage() {
    const {t} = useTranslation();
    const webcamRef = useRef<Webcam>(null);
    const {session} = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const {sendBinary, lastMessage, status} = useWebSocket<WebsocketResponseType>(accessToken && session? `ws://localhost:8000/ws/stream/${session}/?token=${accessToken}` : null)

    const [trackedScore, setTrackedScore] = useState<TrackedScore>({
        eyeScore: 0,
        emotionScore: 0,
        emotion: "Nötr"
    });

    const [errorMsg, setError] = useState<string | null>(null);

    // Take screenshot and send to server.
    const sendFrame = useCallback(() => {
        if (status !== "CONNECTED") return;

        const imgSrc = webcamRef.current?.getScreenshot();
        if (!imgSrc) return;

        fetch(imgSrc)
            .then((res) => res.blob())
            .then((blob) => sendBinary(blob))
    }, [sendBinary, status])

    // Create interval to send frames.
    useEffect(() => {
        const intervalID = setInterval(sendFrame, SEND_INTERVAL)
        return () => {
            clearInterval(intervalID)
        }
    }, [sendFrame])

    useEffect(() => {
        if (lastMessage?.type === "session_complete") {
            if (lastMessage.id) {
                navigate(`/result/${lastMessage.id}`)
            } else {
                navigate(`/history/`)
            }

            return;
        }

        const data = lastMessage?.data;
        if (!data) return;

        startTransition(() => {
            if (!data.face_count || data.face_count < 1) {
                setError("no_face");
            } else {
                setError(null);
                setTrackedScore({
                    eyeScore: data.eye_avg,
                    emotionScore: data.emotion_avg,
                    emotion: data.emotion
                });
            }
        })

    }, [lastMessage, session, navigate])

    if (!accessToken || !session) return <Navigate to='/interview/' replace />
    if (status === "CONNECTING" || status === "DISCONNECTING") return <div className='connecting'>{t("connecting")}...</div>
    if (status === "DISCONNECTED") return <Navigate to='/interview/' state={{disconnectedFromSession: true}} replace />

    return (
        <div className="interview-main-div">
            <div className='webcam-section'>
                <Webcam screenshotFormat='image/jpeg' videoConstraints={{facingMode: 'user'}} audio={false} mirrored ref={webcamRef} />
            </div>
            <div className='instruction-section'>
                <p>{t("interview_page.instruction")}</p>
            </div>
            <div className='feedback-section'>
                {errorMsg ?
                (
                    <div className='score-field error'>
                        {t(`interview_page.error.${errorMsg}`)}
                    </div>
                )
                : 
                (
                    <>
                        <div className={`score-field ${scoreValueToState(trackedScore.emotionScore)}`}><u>{t("interview_page.emotion")}</u><div>{trackedScore.emotion} [{t("percentage_sign", {value:trackedScore.emotionScore})}]</div></div>
                        <div className={`score-field ${scoreValueToState(trackedScore.eyeScore)}`}><u>{t("interview_page.eye_contact")}</u><div>{t("percentage_sign", {value:trackedScore.eyeScore})}</div></div>
                    </>
                )}
            </div>
        </div>
    )
}

export default InterviewPage