import { useCallback, useEffect, useRef, useState } from "react";

export type WebsocketStatus =
    | "CONNECTING"
    | "CONNECTED"
    | "DISCONNECTED"
    | "DISCONNECTING"

export interface WebSocketHookType<T = unknown, S = unknown> {
    status: WebsocketStatus,
    /** The last message that was received. */
    lastMessage: T | null,
    /** Send binary blobs to the server. */
    sendBinary: (blob: Blob) => void,
    /** Send JSON data to the server. */
    sendJSON: (payload: S) => void
}

/** Hook for creating a WebSocket instance. Provides useful callbacks for data communication. */
function useWebSocket<T = unknown, S = unknown>(url: string | null): WebSocketHookType<T, S> {
    const ws = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<WebsocketStatus>("CONNECTING");
    const [lastMessage, setLastMessage] = useState<T | null>(null);

    useEffect(() => {
        if (!url) return;
        ws.current = new WebSocket(url);
        ws.current.binaryType = "arraybuffer";

        const connectingTimeout = setTimeout(() => setStatus("CONNECTING"), 0);

        ws.current.onopen = () => setStatus("CONNECTED");
        ws.current.onclose = () => setStatus("DISCONNECTING");
        ws.current.onerror = (e) => console.error("WebSocket error: ", e);
        ws.current.onmessage = (e: MessageEvent<string>) => {
            const message = JSON.parse(e.data) as T;
            setLastMessage(message);
        };

        return () => {
            clearTimeout(connectingTimeout);
            ws.current?.close()
        }
    }, [url]);

    useEffect(() => {
        if (status !== "DISCONNECTING") return;
        const disconnectingTimeout = setTimeout(() => {
            setStatus("DISCONNECTED")
        }, 3_000);
        return () => clearTimeout(disconnectingTimeout);
    }, [status])

    const sendBinary = useCallback((blob: Blob) => {
        if (ws.current?.readyState !== WebSocket.OPEN) return;
        ws.current.send(blob);
    }, []);

    const sendJSON = useCallback((payload: S) => {
        if (ws.current?.readyState !== WebSocket.OPEN) return;
        ws.current.send(JSON.stringify(payload));
    }, []);

    return { status, lastMessage, sendBinary, sendJSON };
}

export default useWebSocket;