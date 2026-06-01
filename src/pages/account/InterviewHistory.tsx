import React, { useEffect, useMemo, useRef, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import './InterviewHistory.css'

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

const calculateTrend = (data: HistorySummary[]) => {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let i = 0; i < n; i++) {
        sumX  += i;
        sumY  += data[i].totalScore;
        sumXY += i * data[i].totalScore;
        sumX2 += i * i;
    }

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
}

function InterviewHistory() {
    // Hooks.
    const {t, i18n} = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams("?page=1");
    const axiosServer = useAxiosPrivate();
    
    // States and references.
    const [interviews, setInterviews] = useState<HistorySummary[]>([]);
    const chartData = useMemo(() => [...interviews].reverse(), [interviews]);
    const slope = useMemo(() => calculateTrend(chartData), chartData);
    const [loading, setLoading] = useState<boolean>(true);
    const deletingStateRef = useRef<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const currentPage = useMemo(() => {
        const value = parseInt(searchParams.get('page') ?? "1", 10)
        return value > 0? value : null;
    }, [searchParams])

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
        if (!currentPage) return;

        const controller = new AbortController();

        axiosServer
        .get(SESSION_LIST_PATH, {params: {page: currentPage}, signal: controller.signal})
        .then(({ data }) => {
            setTotalPages(data.total_pages);
            setInterviews(data.results.map(deserializeResponse));
            setErrorMsg(null)
        })
        .catch((err) => {
            if (axios.isCancel(err)) return;
            if (!axios.isAxiosError(err)) return setErrorMsg("error.generic");
            if (err.code === "ERR_NETWORK") return setErrorMsg("error.server_unreachable");
            setErrorMsg("error.generic")
        })
        .finally(() => {
            setLoading(false)
        })

        return () => controller.abort();
    }, [currentPage, axiosServer])

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation()

        if (loading) return;
        setLoading(true);

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

    const handlePageSwitch = (e: React.MouseEvent<HTMLButtonElement>, increment: number) => {
        e.stopPropagation();

        const newPage = (currentPage ?? 1) + increment
        if (newPage < 1 || newPage > totalPages || loading) return;
        setLoading(true)
        setSearchParams(`?page=${newPage}`)
    }

    if (loading) return (<div className='interview-history-main'>
        <div className='interview-history-window'>
            <h1>{t("loading")}...</h1>
        </div>
    </div>)

    if (errorMsg) return (<div className='interview-history-main'>
        <div className='interview-history-window'>
            <h1>{t(errorMsg)}</h1>
        </div>
    </div>)

    return (
        <div className='interview-history-main'>
            <div className='interview-history-window'>
                <h1>{t("interview_history.title")}</h1>
                {interviews.length === 0? 
                (<p>
                    {totalPages === 0?
                    (<Trans i18nKey="interview_history.no_interviews">
                        You haven't done any interviews. <Link to="/interview/">Click here</Link> to get started.
                    </Trans>)
                    : 
                    t("interview_history.empty_page")}
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
                                    <Link className='button primary' to={`/history/${data.id}/`}>{t("view")}</Link>
                                    <button className='button danger' onClick={(e) => handleDelete(e, data.id)}>{t("delete")}</button>
                                </td>
                            </tr>
                            ))
                            }
                        </table>
                        {chartData.length > 1 && (<>
                            <h1>{t("interview_history.past_analysis")}</h1>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={chartData}>
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
                            </ResponsiveContainer>
                            <h3>{t("interview_history.comment")}</h3>
                            {t(Math.abs(slope) < 0.25? "interview_history.trend_zero" : slope > 0? "interview_history.trend_up" : "interview_history.trend_down")}
                        </>)}
                    </>
                )
                }
            </div>
            <div className='page-navigator'>
                <button className='button primary small' disabled={currentPage === 1} onClick={(e) => handlePageSwitch(e, -1)}>&lt;</button>
                {currentPage} / {totalPages}
                <button className='button primary small' disabled={(currentPage ?? 1) >= totalPages} onClick={(e) => handlePageSwitch(e, 1)}>&gt;</button>
            </div>
        </div>
    )
}

export default InterviewHistory;