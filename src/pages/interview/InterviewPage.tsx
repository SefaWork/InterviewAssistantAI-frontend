import Webcam from 'react-webcam'
import './InterviewPage.css'
import { useEffect, useRef } from 'react';

// 1 second / FPS
const SEND_INTERVAL = 1_000 / 5

function InterviewPage() {

    const webcamRef = useRef<Webcam>(null);
    const ws = useRef<WebSocket | null>(null);

    // Create a new WebSocket. (WIP.)
    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/ws/webcam/")
        return () => {
            ws.current?.close()
        }
    }, [])

    const sendFrame = () => {
        const imgSrc = webcamRef.current?.getScreenshot();

        // Null guard. (typescript is annoying sometimes)
        if(!imgSrc) {
            console.warn("Webcam component is not fully initialized. (Missing user permissions?)")
            return;
        }

        ws.current?.send(JSON.stringify(imgSrc))
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
                <Webcam ref={webcamRef} mirrored={true} screenshotFormat='image/jpeg'/>
            </div>
            <div className='instruction-section'>
                <h1>Question 1</h1>
                <p>What is your greatest fear?</p>
            </div>
            <div className='feedback-section'>
                You're doing good, keep it up!
            </div>
        </div>
    )
}

export default InterviewPage