import React, { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import './InterviewHistory.css'
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

type HistorySummary = {
    id: string,
    created_at: Date,
    totalScore: number
}

const SESSION_LIST_PATH = '/api/account/interviews/'
const SESSION_DELETE_PATH = '/api/account/delete-interview/'

const deserializeResponse = (entry: {id: string, created_at: string, total_avg: number}): HistorySummary => {
    return {created_at: new Date(entry.created_at), id: entry.id, totalScore: entry.total_avg}
}

function InterviewHistory() {
    const {t, i18n} = useTranslation();
    const [interviews, setInterviews] = useState<HistorySummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const deletingStateRef = useRef<boolean>(false);
    const axiosServer = useAxiosPrivate();
    const navigate = useNavigate();

    const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })

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

    const handleView = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation()
        navigate(`/history/${id}/`)
    }

    if (loading) return (<div className='loading'>Loading...</div>);

    return (
        <div className='interview-history-main'>
            <div className='interview-history-window'>
                <h1>{t("interview_history.title")}</h1>
                {interviews.length === 0? 
                (<p>
                    <Trans i18nKey="interview_history.no_interviews">
                        You haven't done any interviews. <Link to="/interview/">Click here</Link> to get started.
                    </Trans>
                </p>)
                :
                (
                    <table>
                        <tr>
                            <th>{t("interview_history.date")}</th>
                            <th>{t("interview_history.score")}</th>
                            <th>{t("interview_history.options")}</th>
                        </tr>
                        {
                        interviews.map(data => (
                        <tr>
                            <td>{dateFormatter.format(data.created_at)}</td>
                            <td>{t("percentage_sign", {value: data.totalScore})}</td>
                            <td className='options-block'>
                                <button className='view-btn' onClick={(e) => handleView(e, data.id)}>View</button>
                                <button className='delete-btn' onClick={(e) => handleDelete(e, data.id)}>Delete</button>
                            </td>
                        </tr>
                        ))
                        }
                    </table>
                )
                }
            </div>
        </div>
    )
}

export default InterviewHistory;