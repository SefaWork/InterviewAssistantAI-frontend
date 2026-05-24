import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import './InterviewResults.css'

type InterviewResultsType = {
    total: number,
    emotion: number,
    eye: number
}

const SESSION_DISPLAY_PATH = "api/account/interviews/"

function InterviewResults() {
    const {t} = useTranslation()

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState<InterviewResultsType | null>(null)

    const { session } = useParams();
    const axiosServer = useAxiosPrivate();

    useEffect(() => {
        if (!session) return;

        const controller = new AbortController();

        axiosServer
            .get(`${SESSION_DISPLAY_PATH}${session}/`, { signal: controller.signal })
            .then(({ data }) => {
                setResults({
                    emotion: data.emotion_avg ?? 0,
                    eye: data.eye_avg ?? 0,
                    total: data.total_avg ?? 0,
                })
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [axiosServer, session])

    if (loading) return <div className="interview-results-main">Loading...</div>;
    if (!results) return <div className="interview-results-main">404 - Not Found</div>;

    return (
        <div className="interview-results-main">
            <div className='interview-results-window'>
                <div className='score-display'>
                    <div className='score-title'>{t("score_categories.total_score")}</div>
                    <div className='score-value'>{t("percentage_sign", {value: results.total})}</div>
                </div>
                <div className='score-section'>
                    <div className='score-display'>
                        <div className='score-title'>{t("score_categories.emotion_score")}</div>
                        <div className='score-value'>{t("percentage_sign", {value: results.emotion})}</div>
                    </div>
                    <div className='score-display'>
                        <div className='score-title'>{t("score_categories.eye_contact_score")}</div>
                        <div className='score-value'>{t("percentage_sign", {value: results.eye})}</div>
                    </div>
                </div>
                <div className='suggestion-section'>
                    <p>Suggestions go here.</p>
                </div>
                <div className='past-analysis'>
                    <p>Past analysis goes here.</p>
                </div>
            </div>
        </div>
    )
}

export default InterviewResults;