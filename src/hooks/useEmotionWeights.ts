import { useEffect, useState } from "react"
import axiosServer from "../api/axiosServer"
import type { EmotionWeight } from "../types/emotion"

const DEFAULT_EMOTION_WEIGHTS: EmotionWeight = {
    "unknown": 0,
    "angry": 0,
    "disgusted": 0,
    "scared": 10,
    "sad": 25,
    "shocked": 50,
    "neutral": 75,
    "happy": 100
}

const EMOTION_WEIGHT_GET_PATH = "/api/interview/weights/"

function useEmotionWeights() {
    const [emotionWeights, setEmotionWeights] = useState<EmotionWeight>(() => ({...DEFAULT_EMOTION_WEIGHTS}))

    useEffect(() => {
        const abortController = new AbortController()
        axiosServer.get(EMOTION_WEIGHT_GET_PATH, {signal: abortController.signal})
        .then(({data}) => {
            setEmotionWeights(data);
        })
        .catch((err) => {
            console.error(err);
        })
        return () => abortController.abort()
    }, [])

    return emotionWeights
}

export default useEmotionWeights;