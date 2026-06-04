import { useCallback, useEffect, useRef, useState } from "react";

export type WebsocketStatus =
    | "CONNECTING"
    | "CONNECTED"
    | "DISCONNECTED"
    | "DISCONNECTING"

export interface WebSocketHookType<S = unknown> {
    status: WebsocketStatus,
    /** Send binary blobs to the server. */
    sendBinary: (blob: Blob) => void,
    /** Send JSON data to the server. */
    sendJSON: (payload: S) => void
}

/** Hook for creating a WebSocket instance. Provides useful callbacks for data communication. */
function useWebSocket<T = unknown, S = unknown>(url: string | null, onMessage: ((msg: T) => unknown) | null): WebSocketHookType<S> {
    const ws = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<WebsocketStatus>("CONNECTING");

    useEffect(() => {
        if (!url || !onMessage) return;
        ws.current = new WebSocket(url);
        ws.current.binaryType = "arraybuffer";

        const connectingTimeout = setTimeout(() => setStatus("CONNECTING"), 0);

        ws.current.onopen = () => setStatus("CONNECTED");
        ws.current.onclose = () => setStatus("DISCONNECTING");
        ws.current.onerror = (e) => console.error("WebSocket error: ", e);
        ws.current.onmessage = (e: MessageEvent<string>) => onMessage(JSON.parse(e.data) as T);

        return () => {
            clearTimeout(connectingTimeout);
            ws.current?.close()
        }
    }, [url, onMessage]);

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

    return { status, sendBinary, sendJSON };
}

export default useWebSocket;