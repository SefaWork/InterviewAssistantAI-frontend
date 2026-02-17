import Webcam from '../../components/common/Webcam'
import './InterviewSetup.css'

function InterviewSetup() {
    return (
        <div className="interview-setup-main-div">
            <h1>Let's prepare your camera.</h1>
            <p>You need to give Camera permission to continue. You know you have enabled it successfully if you see your face below.</p>
            <div className="webcam-bg">
                <Webcam />
            </div>
        </div>
    )
}

export default InterviewSetup