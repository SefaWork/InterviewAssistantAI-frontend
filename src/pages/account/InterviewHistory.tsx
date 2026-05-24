import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './InterviewHistory.css'

type HistorySummary = {
    id: string,
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

const deserializeResponse = (entry: {id: string, created_at: string, total_avg: number}): HistorySummary => {
    return {created_at: new Date(entry.created_at), id: entry.id, totalScore: entry.total_avg}
}

function InterviewHistory() {
    const [interviews, setInterviews] = useState<HistorySummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const axiosServer = useAxiosPrivate();

    useEffect(() => {
        const controller = new AbortController();

        axiosServer
        .get(SESSION_LIST_PATH, {params: {page: 1}, signal: controller.signal})
        .then(({ data }) => {
            setInterviews(data.map(deserializeResponse));
            setLoading(false);
        })
        .catch((err) => console.error(err))

        return () => controller.abort();
    }, [axiosServer])

    if (loading) return (<div className='loading'>Loading...</div>);

    return (
        <ol>
            {interviews.length <= 0 && <li>You haven't done any interviews!</li>}
            {interviews.map(interviewData => (
                <li key={interviewData.id}>{formatDate(interviewData.created_at)} {interviewData.totalScore}%</li>
            ))}
        </ol>
    )
}

export default InterviewHistory;