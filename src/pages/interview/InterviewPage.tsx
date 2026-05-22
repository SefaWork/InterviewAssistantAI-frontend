import Webcam from 'react-webcam'
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './InterviewPage.css'
import useWebSocket from '../../hooks/useWebSocket';
import { useParams } from 'react-router-dom';

// 1 second / FPS
const SEND_INTERVAL = 1_000 / 5

type WebsocketResponseType = {
    type?: "result",
    data?: {
        face_count: number,
        eye_contact_score: number,
        emotion: string
    }
}

type TrackedScore = {
    eyeScore: number,
    emotion: string
}

type FieldStates =
    | "good"
    | "average"
    | "bad"

/**Note: Current emotion names are temporary, will be changed to lowercase english names for localization table. */
const emotionToFieldState = (emotionKey: string): FieldStates => {
    switch(emotionKey) {
        case "Mutlu":
            return "good";
        case "Nötr":
            return "average";
        default:
            return "bad"
    }
}

const eyeScoreToFieldState = (eyeScore: number): FieldStates => {
    if (eyeScore > 75) return "good"
    else if (eyeScore > 35) return "average"
    return "bad"
}

function InterviewPage() {
    const {t} = useTranslation();
    const webcamRef = useRef<Webcam>(null);
    const {id} = useParams();

    console.log(id);

    const {sendBinary, lastMessage} = useWebSocket<WebsocketResponseType>("ws://localhost:8000/ws/stream/")

    const [trackedScore, setTrackedScore] = useState<TrackedScore>({
        eyeScore: 0,
        emotion: "Nötr"
    });

    const [errorMsg, setError] = useState<string | null>(null);

    // Take screenshot and send to server.
    const sendFrame = useCallback(() => {
        const imgSrc = webcamRef.current?.getScreenshot();
        if (!imgSrc) return;

        fetch(imgSrc)
            .then((res) => res.blob())
            .then((blob) => sendBinary(blob))
    }, [sendBinary])

    // Create interval to send frames.
    useEffect(() => {
        const intervalID = setInterval(sendFrame, SEND_INTERVAL)
        return () => {
            clearInterval(intervalID)
        }
    }, [sendFrame])

    useEffect(() => {
        if (lastMessage?.type !== "result") return;
        const data = lastMessage.data;
        if (!data) return;

        startTransition(() => {
            if (!data.face_count || data.face_count < 1) {
                setError("no_face");
            } else {
                setError(null);
                setTrackedScore({
                    eyeScore: data.eye_contact_score,
                    emotion: data.emotion
                });
            }
        })
    }, [lastMessage])

    return (
        <div className="interview-main-div">
            <div className='webcam-section'>
                <Webcam screenshotFormat='image/jpeg' videoConstraints={{facingMode: 'user'}} audio={false} mirrored ref={webcamRef} />
            </div>
            <div className='instruction-section'>
                <h1>Test Questions</h1>
                <p>Questions will end up here.</p>
            </div>
            <div className='feedback-section'>
                {!errorMsg && (
                    <>
                        <div className={`score-field ${emotionToFieldState(trackedScore.emotion)}`}><u>{t("interview_page.emotion")}</u><div>{trackedScore.emotion}</div></div>
                        <div className={`score-field ${eyeScoreToFieldState(trackedScore.eyeScore)}`}><u>{t("interview_page.eye_contact")}</u><div>{t("percentage_sign", {value:trackedScore.eyeScore})}</div></div>
                    </>
                )}
                {errorMsg && (<div className='score-field error'>{t(`interview_page.error.${errorMsg}`)}</div>)}
            </div>
        </div>
    )
}

export default InterviewPage