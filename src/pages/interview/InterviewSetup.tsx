import Webcam from '../../components/common/Webcam'
import './InterviewSetup.css'

function InterviewSetup() {
    return (
        <div className="interview-setup-main-div">
            <div className="setup-title">
                <h1>Let's prepare your camera.</h1>
                <p>We need permission to use your camera to continue. If you can see your face below, you have configured your camera correctly.</p>
            </div>
            <div className="webcam-container">
                <div className="webcam-bg">
                    <Webcam />
                </div>
            </div>
        </div>
    )
}

export default InterviewSetup