import Webcam from '../../components/common/Webcam'
import './InterviewPage.css'

function InterviewPage() {
    return (
        <div className="interview-main-div">
            <div className='webcam-section'>
                <Webcam />
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