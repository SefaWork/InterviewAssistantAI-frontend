import { useEffect, useState } from 'react';
import './InterviewHistory.css'

interface HistorySummary {
    id: number,
    date: Date,
    totalScore: number
}

const formatDate = (d: Date) => {
  const datePart = d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  const timePart = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart.replace(/\//g, ".")} ${timePart}`;
};

function InterviewHistory() {
    const [interviews, setInterviews] = useState<HistorySummary[]>([
        {id: 1, date: new Date(2026, 4, 3), totalScore: 81},
        {id: 2, date: new Date(2026, 4, 1), totalScore: 77}
    ]); // Demo values.
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        
    }, [])

    return (
        <div className='interivew-history-main'>
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <ol>
                    {interviews.length <= 0 && <li>You haven't done any interviews!</li>}
                    {interviews.map(interviewData => (
                        <li>{formatDate(interviewData.date)} {interviewData.totalScore}%</li>
                    ))}
                </ol>
            )}
        </div>
    )
}

export default InterviewHistory;