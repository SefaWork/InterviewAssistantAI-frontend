import { useEffect } from 'react';
import './InterviewResults.css'

function InterviewResults() {

    // Should take in the ID of the interview, fetch results and then display them. (TODO)
    // (currently using demo values)
    const totalScore = 100;
    const facialScore = 100;
    const eyeContactScore = 100;

    useEffect(() => {
        // Fetch results from ID.
        console.log("TODO: Fetch results.")
    })

    return (
        <div className="interview-results-main">
            <div className='interview-results-window'>
                <div className='score-display'>
                    <div className='score-title'>Total Score</div>
                    <div className='score-value'>{totalScore}%</div>
                </div>
                <div className='score-section'>
                    <div className='score-display'>
                        <div className='score-title'>Facial Expression Score</div>
                        <div className='score-value'>{facialScore}%</div>
                    </div>
                    <div className='score-display'>
                        <div className='score-title'>Eye Contact Score</div>
                        <div className='score-value'>{eyeContactScore}%</div>
                    </div>
                </div>
                <div className='suggestion-section'>
                    <p>Suggestions go here.</p>
                </div>
                <div className='past-analysis'>
                    <p>Past analysis goes here. Which parts did the user improve on? Which parts did they do worse on?</p>
                </div>
            </div>
        </div>
    )
}

export default InterviewResults;