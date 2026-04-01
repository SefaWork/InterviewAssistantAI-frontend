import Webcam from 'react-webcam'
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axiosServer from '../../api/axiosServer';
import axios from 'axios';
import './InterviewPage.css'

interface TrackedScore {
    eyeScore: number,
    emotion: string
}

type FieldStates =
    | "good"
    | "average"
    | "bad"

// 1 second / FPS
const SEND_INTERVAL = 1_000 / 5

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
    const processingFrameRef = useRef<boolean>(false);
    
    const [trackedScore, setTrackedScore] = useState<TrackedScore>({
        eyeScore: 0,
        emotion: "Nötr"
    });

    const [errorMsg, setError] = useState<string | null>(null);

    const sendFrame = async () => {
        
        const imgSrc = webcamRef.current?.getScreenshot();
        
        // Null guard. (typescript is annoying sometimes)
        if(!imgSrc) {
            console.warn("Webcam component is not fully initialized. (Missing user permissions?)")
            return;
        }
        
        if (processingFrameRef.current) return;
        processingFrameRef.current = true;
        
        try {
            const res = await fetch(imgSrc);
            
            const formData = new FormData();
            formData.append("image", await res.blob());

            const response = await axiosServer.post('/api/interview/analyze/', formData);
            const responseData = response.data;

            // Show error if theres no faces or when there are more than one.
            if (!responseData.face_count || responseData.face_count < 1) {
                setError("no_face")
            } else if (responseData.face_count > 1) {
                setError("multiple_faces")
            } else {
                // No issues, edit scores and reset errors.
                const newScore: TrackedScore = {
                    eyeScore: responseData.eye_contact_score,
                    emotion: responseData.emotion
                }
    
                setError(null);
                setTrackedScore(newScore);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError("generic"); // Server responded with error
                } else {
                    setError("fetch"); // Network error.
                }
            } else {
                setError("generic"); // Non-axios related error.
            }
        }

        processingFrameRef.current = false;
    }

    // Create interval to send frames.
    useEffect(() => {
        const intervalID = setInterval(sendFrame, SEND_INTERVAL)
        return () => {
            clearInterval(intervalID)
        }
    }, [])

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