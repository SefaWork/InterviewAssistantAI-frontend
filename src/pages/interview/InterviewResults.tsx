import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import { EMOTION_COLORS, EMOTIONS, type EmotionWeight } from '../../types/emotion';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import CollapsibleDiv from '../../components/common/CollapsibleDiv';
import './InterviewResults.css'

type InterviewResultsType = {
    total_score: number,
    emotion_score: number,
    eye_score: number,
    feedback: string[],
    past_analysis_feedback: string[],
    duration: number,
} & EmotionWeight

const secondsToFormatted = (seconds: number) => {
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = Math.floor(seconds % 60).toString().padStart(2, '0');
  const ms = Math.floor((seconds % 1) * 100).toString().padStart(2, '0');

  return `${mm}:${ss}.${ms}`;
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

const scoreValueToState = (score: number): "good" | "average" | "bad" => {
    if (score > 50) return "good"
    else if (score > 25) return "average"
    return "bad"
}

type CellDataType = {name: string, value: number, fill: string}

// @TODO Improve the UI design.
function InterviewResults() {
    const {t} = useTranslation()

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState<InterviewResultsType | null>(null)
    const [animate, setAnimate] = useState(true)

    const distributionData = useMemo<CellDataType[] | null>(() => {
        if (!results) return null;

        const distValues: CellDataType[] = [];

        for (const emotion of EMOTIONS) {
            const emotionDist = results[emotion];
            if (!emotionDist) continue;

            distValues.push({
                name: t(`emotion.${emotion}`),
                value: Math.round(emotionDist * 1000) / 10,
                fill: EMOTION_COLORS[emotion]
            })
        }

        distValues.sort((a, b) => b.value - a.value)
        return distValues
    }, [results, t])

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
                // Deconstruct the feedback and past analysis feedback.
                data.feedback = convertFeedbackToTranslationKeys(data.feedback ?? "");
                data.past_analysis_feedback = convertFeedbackToTranslationKeys(data.past_analysis_feedback ?? "");
                setResults(data)
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [axiosServer, session])

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        if (location.pathname.startsWith('/history/')) {
            navigate(-1)
        } else {
            navigate('/history/')
        }
    }

    if (loading) return <div className="interview-results-main">Loading...</div>;
    if (!results) return <div className="interview-results-main">404 - Not Found</div>;

    return (
        <div className="interview-results-main">
            <div className='interview-results-window'>
                <div className='score-display'>
                    <div className='score-title'>{t("score_categories.total_score")}</div>
                    <div className={`score-value ${scoreValueToState(results.total_score)}`}>{t("percentage_sign", {value: results.total_score})} <Link to="/about/#scoring-info" className='info-link'>[?]</Link></div>
                </div>
                <div className='score-section'>
                    <div className='score-display'>
                        <div className='score-title'>{t("score_categories.emotion_score")}</div>
                        <div className={`score-value ${scoreValueToState(results.emotion_score)}`}>{t("percentage_sign", {value: results.emotion_score})}</div>
                    </div>
                    <div className='score-display'>
                        <div className='score-title'>{t("score_categories.eye_contact_score")}</div>
                        <div className={`score-value ${scoreValueToState(results.eye_score)}`}>{t("percentage_sign", {value: results.eye_score})}</div>
                    </div>
                    <div className='score-display'>
                        <div className='score-title'>{t("interview_history.duration")}</div>
                        <div className='score-value'>{secondsToFormatted(results.duration)}</div>
                    </div>
                </div>
                {distributionData && 
                    <CollapsibleDiv 
                        width="100%"
                        title={t("interview_history.emotion_analysis")}
                    >
                        <ResponsiveContainer width={"100%"} height={400} style={{marginBottom: "1rem"}}>
                            <PieChart>
                                <Tooltip formatter={(value) => t("percentage_sign", {value})} />
                                <Pie
                                    isAnimationActive={animate? "auto" : false}
                                    onAnimationStart={() => setAnimate(true)}
                                    onAnimationEnd={() => setAnimate(false)}
                                    data={distributionData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="70%"
                                    label={({name, value}) => value > 5? `${name}: ${t("percentage_sign", {value})}` : undefined}
                                    labelLine={false}
                                />
                                <Legend itemSorter={"dataKey"} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CollapsibleDiv>
                }
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