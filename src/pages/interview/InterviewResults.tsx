import './InterviewResults.css'

function InterviewResults() {

    // Should take in the ID of the interview, fetch results and then display them. (TODO)

    return (
        <div className="interview-results-main">
            <div className='interview-results-window'>
                <div className='score-display'>
                    <div className='score-title'>Total Score</div>
                    <div className='score-value'>100%</div>
                </div>
                <div className='score-section'>
                    <div className='score-display'>
                        <div className='score-title'>Facial Expression Score</div>
                        <div className='score-value'>100%</div>
                    </div>
                    <div className='score-display'>
                        <div className='score-title'>Eye Contact Score</div>
                        <div className='score-value'>100%</div>
                    </div>
                </div>
                <div className='suggestion-section'>
                    <div>It is important to maintain eye contact while talking with your interviewer. This is not only good advice for most social sitautions, but it is especially useful in an interview setting to help you appear more confident and capable.</div>
                </div>
            </div>
        </div>
    )
}

export default InterviewResults;