import { useCallback, useEffect, useRef, useState } from "react";

export type WebsocketStatus =
    | "CONNECTING"
    | "CONNECTED"
    | "DISCONNECTED"

export interface WebSocketHookType {
    status: WebsocketStatus,

    /**The last message that was received. */
    lastMessage: any,

    /**Send binary blobs to the server. */
    sendBinary: (blob: Blob) => any,

    /**Send JSON data to the server. */
    sendJSON: (payload: any) => any
}

/**Hook for creating a WebSocket instance. Provides useful callbacks for data communication. */
function useWebSocket(url: string): WebSocketHookType {
    const ws = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<WebsocketStatus>("DISCONNECTED");
    const [lastMessage, setLastMessage] = useState<any>(null);

    useEffect(() => {
        setStatus("CONNECTING");
        ws.current = new WebSocket(url);
        ws.current.binaryType = "arraybuffer";

        ws.current.onopen = () => setStatus("CONNECTED");
        ws.current.onclose = () => setStatus("DISCONNECTED");
        ws.current.onerror = (e) => console.error("WebSocket error: ", e);
        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            setLastMessage(message);
        };

        return () => ws.current?.close();
    }, [url]);

    const sendBinary = useCallback((blob: Blob) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(blob);
        }
    }, [])

    const sendJSON = useCallback((payload: any) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(payload))
        }
    }, [])

    return { status, lastMessage, sendBinary, sendJSON }
}

export default useWebSocket;