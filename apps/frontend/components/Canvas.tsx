"use client"

import { useEffect, useRef, useState } from "react"
import { initDraw } from "../draw"
import { Game } from "../draw/Game";
import Topbar from "./TopBar";

export type Tool = "circle" | "rect" | "pencil";

export default function Canvas({ roomId, socket}: {
    roomId: string,
    socket: WebSocket,
}){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() =>{
        if(canvasRef.current){
            const canvas = canvasRef.current
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }
    },[socket])

    return(
        <div style={{
            height: "100vh",
            overflow: "hidden"
        }}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    )
}