import React, { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import './InterviewHistory.css'
import { Link } from 'react-router-dom';

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
const SESSION_DELETE_PATH = '/api/account/delete-interview/'

const deserializeResponse = (entry: {id: string, created_at: string, total_avg: number}): HistorySummary => {
    return {created_at: new Date(entry.created_at), id: entry.id, totalScore: entry.total_avg}
}

function InterviewHistory() {
    const [interviews, setInterviews] = useState<HistorySummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const deletingStateRef = useRef<boolean>(false);
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

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation()

        if (deletingStateRef.current) return;
        deletingStateRef.current = true;

        setInterviews((val) => {
            return val.filter(oldVal => oldVal.id !== id)
        })

        try {
            await axiosServer.post(SESSION_DELETE_PATH, {"session_id": id})
        } catch(err) {
            console.error(err)
        } finally {
            deletingStateRef.current = false;
        }
    }

    if (loading) return (<div className='loading'>Loading...</div>);

    return (
        <ol>
            {interviews.length <= 0 && <li>You haven't done any interviews!</li>}
            {interviews.map(interviewData => (
                <li key={interviewData.id}>
                    <Link to={`/history/${interviewData.id}`}>
                        {formatDate(interviewData.created_at)} {interviewData.totalScore}%
                    </Link>
                    <button onClick={(e) => handleDelete(e, interviewData.id)}>Delete</button>
                </li>
            ))}
        </ol>
    )
}

export default InterviewHistory;