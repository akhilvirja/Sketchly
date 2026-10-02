"use client"
import { useEffect, useState } from "react";
import { getToken } from "../services";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || process.env.WS_URL || "ws://localhost:8080";

export function useSocket(roomId: string) : {
    ws: WebSocket | null,
    loading: boolean,
} {
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const token = getToken();
        const socket = new WebSocket(`${WS_URL}?token=${token ?? ""}`);

        socket.onopen = () => {
            const data = JSON.stringify({
                type: "join_room",
                roomId,
            });
            socket.send(data);
            setLoading(false);
        };

        socket.onerror = () => {
            setLoading(false);
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, [roomId, WS_URL]);

    return {
        ws,
        loading
    }
}