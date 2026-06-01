import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import './InterviewResults.css'

type InterviewResultsType = {
    total: number,
    emotion: number,
    eye: number,
    feedback: string[],
    past_analysis_feedback: string[]
}

const SESSION_DISPLAY_PATH = "api/account/interviews/"

const convertFeedbackToTranslationKeys = (feedbackText: string): string[] => {
    if (!feedbackText) return [];
    return feedbackText.split(';').map(x => {
        if(!x) return ""
        const split = x.split(':')
        return `feedback.${split[0]}_${split[1]}`
    }).filter(Boolean)
}

function InterviewResults() {
    const {t} = useTranslation()

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState<InterviewResultsType | null>(null)

    const { session } = useParams();
    const axiosServer = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!session) return;

        const controller = new AbortController();

        axiosServer
            .get(`${SESSION_DISPLAY_PATH}${session}/`, { signal: controller.signal })
            .then(({ data }) => {
                const {emotion_score = 0, eye_score = 0, total_score = 0, feedback = "", past_analysis_feedback = ""} = data;

                // Deconstruct the feedback and past analysis feedback.
                const feedbackTranslated = convertFeedbackToTranslationKeys(feedback);
                const pastAnalysisTranslated = convertFeedbackToTranslationKeys(past_analysis_feedback);

                setResults({
                    emotion: emotion_score,
                    eye: eye_score,
                    total: total_score,
                    feedback: feedbackTranslated,
                    past_analysis_feedback: pastAnalysisTranslated
                })
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [axiosServer, session])

    const handleBack = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        if (location.pathname.startsWith('/history/')) {
            navigate(-1)
        } else {
            navigate('/history/')
        }
    }, [navigate])

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
                    {results.feedback.length === 0? 
                        (<h3>{t("feedback.no_feedback")}</h3>)
                        :
                        (<ul>
                            {results.feedback.map(x => (<li key={x}>{t(x)}</li>))}
                        </ul>)
                    }
                </div>
                <div className='past-analysis'>
                    {results.past_analysis_feedback.length === 0? 
                        (<h3>{t("feedback.no_past_analysis")}</h3>)
                        :
                        (<ul>
                            {results.past_analysis_feedback.map(x => (<li key={x}>{t(x)}</li>))}
                        </ul>)
                    }
                </div>
                <button className='button primary large' onClick={handleBack}>
                    &lt;&lt; {t("interview_history.title")}
                </button>
            </div>
        </div>
    )
}

export default InterviewResults;