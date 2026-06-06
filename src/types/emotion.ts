export const EMOTIONS = ["happy", "neutral", "shocked", "sad", "scared", "angry", "disgusted", "unknown"] as const
export type EmotionType = typeof EMOTIONS[number]
export type EmotionWeight = Record<EmotionType, number>

export const EMOTION_COLORS: Record<EmotionType, string> = {
    angry: "#FF0000",
    disgusted: "#00A000",
    happy: "#FFA000",
    neutral: "#A0A0A0",
    sad: "#00A0FF",
    scared: "#A000FF",
    shocked: "#FFA0FF",
    unknown: "#404040"
}