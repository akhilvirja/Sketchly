"use client"

import { useEffect, useRef } from "react"
import { initDraw } from "../draw"

export default function Canvas({ roomId, socket}: {
    roomId: string,
    socket: WebSocket,
}){
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() =>{
        if(canvasRef.current){
            const canvas = canvasRef.current
            initDraw(canvas, roomId, socket)
        }
    },[socket])

    return(
        <canvas ref={canvasRef} width={2000} height={700}></canvas>
    )
}