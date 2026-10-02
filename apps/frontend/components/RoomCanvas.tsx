"use client"
import { useSocket } from "../hooks/useSocket"
import Canvas from "./Canvas"

export default function RoomCanvas({ roomId }: {
    roomId: string
}){
    const {ws, loading} = useSocket(roomId)

    
    if(!ws){
        return(
            <div>
                Connecting To Server...
            </div>
        )
    }

    return (
        <Canvas roomId={roomId} socket={ws} />
    )
}