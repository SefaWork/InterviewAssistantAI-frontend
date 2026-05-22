import { useEffect, useState } from 'react';
import './InterviewHistory.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

type HistorySummary = {
    id: number,
    created_at: Date,
    totalScore: number
}

const formatDate = (date: Date) => {
    const datePart = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
    });

    const timePart = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${datePart.replace(/\//g, ".")} ${timePart}`;
};

const SESSION_LIST_PATH = '/api/account/interviews/'

const deserializeResponse = (entry: {id: string, created_at: string}): HistorySummary => {
    return {created_at: new Date(entry.created_at), id: parseInt(entry.id), totalScore: 100}
}

function InterviewHistory() {
    const [interviews, setInterviews] = useState<HistorySummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const axios = useAxiosPrivate();

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const { data } = await axios.get(SESSION_LIST_PATH, {params: {page: 1}});
                setInterviews(data.map(deserializeResponse));
                setLoading(false);
            } catch(err) {
                console.error(err)
            }
        }

        fetchData();

        return () => controller.abort();
    }, [axios])

    return (
        <div className='interivew-history-main'>
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <ol>
                    {interviews.length <= 0 && <li>You haven't done any interviews!</li>}
                    {interviews.map(interviewData => (
                        <li key={interviewData.id}>{formatDate(interviewData.created_at)} {interviewData.totalScore}%</li>
                    ))}
                </ol>
            )}
        </div>
    )
}

export default InterviewHistory;