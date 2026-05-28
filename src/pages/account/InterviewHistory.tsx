import React, { useEffect, useMemo, useRef, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import './InterviewHistory.css'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type HistorySummary = {
    id: string,
    created_at: number,
    totalScore: number
}

const SESSION_LIST_PATH = '/api/account/interviews/'
const SESSION_DELETE_PATH = '/api/account/delete-interview/'

const deserializeResponse = (entry: {id: string, created_at: string, total_avg: number}): HistorySummary => {
    return {created_at: new Date(entry.created_at).getTime(), id: entry.id, totalScore: entry.total_avg}
}

function InterviewHistory() {
    const {t, i18n} = useTranslation();
    const [interviews, setInterviews] = useState<HistorySummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const deletingStateRef = useRef<boolean>(false);
    const axiosServer = useAxiosPrivate();
    const navigate = useNavigate();

    const chartData = useMemo(() => [...interviews].reverse(), [interviews]);

    const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })

    const graphDateFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
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
                    <>
                        <table className='history-table'>
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
                                    <button className='view-btn' onClick={(e) => handleView(e, data.id)}>{t("view")}</button>
                                    <button className='delete-btn' onClick={(e) => handleDelete(e, data.id)}>{t("delete")}</button>
                                </td>
                            </tr>
                            ))
                            }
                        </table>
                        {chartData.length > 1 && (
                            <LineChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={chartData}>
                                <XAxis 
                                    dataKey="created_at"
                                    name={t("interview_history.date")}
                                    domain={["dataMin", "dataMax"]}
                                    ticks={[chartData[0]?.created_at, chartData[chartData.length - 1]?.created_at]}
                                    tickFormatter={(timestamp) => graphDateFormatter.format(timestamp)}
                                    tick={{dx: -10}} 
                                />
                                <YAxis 
                                    dataKey="totalScore"
                                    type='number'
                                    domain={[dataMin => Math.max(0, dataMin - 10), dataMax => Math.min(100, dataMax + 10)]}
                                    tickFormatter={(value) => t("percentage_sign", {value})}
                                    tick={{dy: -10}} 
                                />
                                <Tooltip 
                                    contentStyle={{color: "var(--secondary-text-color)", backgroundColor: "var(--foreground-color)"}}
                                    labelStyle={{color: "var(--secondary-text-color)"}}
                                    itemStyle={{color: "var(--secondary-text-color)"}}
                                    labelFormatter={(timestamp) => dateFormatter.format(timestamp)} 
                                    formatter={(value, name) => [t("percentage_sign", {value}), name]}
                                />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Line type="monotone" dataKey="totalScore" name={t("interview_history.score")} stroke="var(--foreground-color)" />
                            </LineChart>
                        )}
                    </>
                )
                }
            </div>
        </div>
    )
}

export default InterviewHistory;