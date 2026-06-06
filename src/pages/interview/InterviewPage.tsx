import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useWebSocket from '../../hooks/useWebSocket';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './InterviewPage.css'

// 1 second / FPS
const SEND_INTERVAL = 1_000 / 5
const UPDATE_INTERVAL = 1_000 / 30

type SessionCompleteResponse = {
    type: "session_complete",
    id?: string
}

type FrameResultResponse = {
    type: "result",
    data: {
        face_count: number,
        eye_contact_score: number,
        emotion: string,
        emotion_avg: number,
        eye_avg: number
    }
}

type TimeSyncMessage = {
    type: "time",
    elapsed_time: number
}

type SessionQuestionResponse = {
    type: "question",
    question: string
}

type WebsocketMessageType = SessionCompleteResponse | FrameResultResponse | TimeSyncMessage | SessionQuestionResponse;

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

const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10) // 2 digits
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`
}

// @TODO Improve UI design.
// @TODO Add progress bar.
// @TODO Add confidence indicator.
function InterviewPage() {
    const {t, i18n} = useTranslation();
    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();
    const [ question, setQuestion ] = useState<string>("loading");
    const [ startTime, setStartTime ] = useState<number>(() => Date.now());
    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const { accessToken } = useAuth();
    const [ playing, setPlaying ] = useState<boolean>(false);

    const [trackedScore, setTrackedScore] = useState<TrackedScore>({
        eyeScore: 0,
        emotionScore: 0,
        emotion: "Nötr"
    });
    
    const [errorMsg, setError] = useState<string | null>(null);

    const handleMessage = useCallback((message: WebsocketMessageType) => {
        if (!message.type) return;

        switch (message.type) {
            case "session_complete":
                if (!message.id) return;
                return navigate(message.id? `/result/${message.id}` : `/history/`);
            case "time":
                return setStartTime(Date.now() - message.elapsed_time * 1_000); // Convert to milliseconds.
            case "result": {
                const {face_count = 0, eye_avg = 0, emotion_avg = 0, emotion = "unknown"} = message.data
                if (face_count < 1) return setError("no_face");
                else {
                    setError(null);
                    setTrackedScore({
                        eyeScore: eye_avg,
                        emotionScore: emotion_avg,
                        emotion: emotion
                    });
                    return;
                }
            }
            case "question": return setQuestion(message.question)
        }
    }, [navigate])

    const {sendBinary, sendJSON, status} = useWebSocket<WebsocketMessageType>(accessToken? `ws://localhost:8000/ws/stream/?token=${accessToken}` : null, handleMessage)

    // Take screenshot and send to server.
    const sendFrame = useCallback(() => {
        if (status !== "CONNECTED") return;

        const imgSrc = webcamRef.current?.getScreenshot();
        if (!imgSrc) return;

        fetch(imgSrc)
            .then((res) => res.blob())
            .then((blob) => sendBinary(blob))
    }, [sendBinary, status])

    const updateTime = useCallback(() => {
        setCurrentTime(Date.now() - startTime)
    }, [startTime])

    const handleFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        sendJSON({"type": "finish"});
    }

    const handleQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        sendJSON({"type": "question"});
    }

    // Create interval to send frames.
    useEffect(() => {
        const intervalID = setInterval(sendFrame, SEND_INTERVAL)
        return () => {
            clearInterval(intervalID)
        }
    }, [sendFrame])

    useEffect(() => {
        try {
            const audio = new Audio(`/question_audio/${i18n.languages[0]}/${question}.mp3`)
            
            audio.addEventListener("ended", () => {
                setPlaying(false)
            })

            audio.play()
                .then(() => {
                    setPlaying(true)
                })
            
            return () => {
                audio.pause();
            }
        } catch(err) {
            console.error(err)
        }
    }, [i18n.languages, question])

    useEffect(() => {
        const intervalID = setInterval(updateTime, UPDATE_INTERVAL)
        return () => {
            clearInterval(intervalID)
        }
    }, [updateTime])

    if (!accessToken) return <Navigate to='/interview/' replace />
    if (status === "CONNECTING" || status === "DISCONNECTING") return <div className='connecting'>{t("connecting")}...</div>
    if (status === "DISCONNECTED") return <Navigate to='/interview/' state={{disconnectedFromSession: true}} replace />

    return (
        <div className="interview-main-div">
            <div className='webcam-section'>
                <Webcam screenshotFormat='image/jpeg' videoConstraints={{facingMode: 'user'}} audio={false} mirrored ref={webcamRef} />
            </div>
            <div className='instruction-section'>
                <p>{t(`question.${question}`)}</p>
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
                        <div className={`score-field ${scoreValueToState(trackedScore.emotionScore)}`}><u>{t("interview_page.emotion")}</u><div>{t(`emotion.${trackedScore.emotion}`)} [{t("percentage_sign", {value:trackedScore.emotionScore})}]</div></div>
                        <div className={`score-field good`}><h1>{formatTime(currentTime)}</h1></div>
                        <div className={`score-field ${scoreValueToState(trackedScore.eyeScore)}`}><u>{t("interview_page.eye_contact")}</u><div>{t("percentage_sign", {value:trackedScore.eyeScore})}</div></div>
                    </>
                )}
            </div>
            <div className='buttons-section'>
                <button disabled={playing} style={{marginBottom: "1rem"}} onClick={handleQuestion} className='button primary large'>Next Question</button>
                <button disabled={currentTime <= 60_000} style={{marginBottom: "1rem"}} onClick={handleFinish} className='button danger large'>Finish</button>
            </div>
        </div>
    )
}

export default InterviewPage