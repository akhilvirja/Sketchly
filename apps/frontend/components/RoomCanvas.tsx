"use client";

import Link from "next/link";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";
import Canvas from "./Canvas";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const { loading: authLoading, isAuthenticated } = useAuth({
    requireAuth: true,
    redirectTo: `/signin?redirect=/room/${roomId}`,
  });

  const { ws, loading: socketLoading } = useSocket(roomId);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <p className="text-zinc-500 text-sm">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!ws || socketLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans p-4">
        <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-lg text-center max-w-sm w-full">
          <h2 className="text-base font-semibold text-white mb-2">Connecting to Room #{roomId}</h2>
          <p className="text-xs text-zinc-400 mb-6">
            Establishing secure real-time WebSocket connection to the whiteboard...
          </p>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-zinc-700 text-xs text-zinc-300 hover:text-white rounded transition-colors inline-block"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <Canvas roomId={roomId} socket={ws} />;
}