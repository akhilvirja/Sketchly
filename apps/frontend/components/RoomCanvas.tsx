"use client";

import Link from "next/link";
import { Radio, ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] flex flex-col items-center justify-center font-mono gap-3">
        <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-[#13171d]">
          <span className="w-2 h-2 bg-[#ccff00] animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider text-zinc-300">AUTHENTICATING SESSION LEASE...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!ws || socketLoading) {
    return (
      <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Precision Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#272C35_1px,transparent_1px),linear-gradient(to_bottom,#272C35_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="w-full max-w-md bg-[#0c0e11] border border-white/10 p-1 shadow-2xl z-10">
          <div className="bg-[#13171d] border border-white/10 p-6 text-center flex flex-col items-center">
            <div className="w-10 h-10 bg-[#0c0e11] border border-[#ccff00]/40 text-[#ccff00] flex items-center justify-center mb-4">
              <Radio size={20} className="animate-pulse" />
            </div>

            <span className="text-[10px] text-[#ccff00] font-bold tracking-widest uppercase mb-1">
              SOCKET INIT // RFC 6455
            </span>
            <h2 className="font-sans text-lg font-bold text-white mb-2">
              Connecting to Room #{roomId}
            </h2>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed max-w-xs font-mono">
              Establishing sub-50ms synchronized WebSocket mesh for multiplayer vector drafting...
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#101318] hover:bg-[#1a1f26] border border-white/10 text-xs font-bold text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Command Center [ESC]</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Canvas roomId={roomId} socket={ws} />;
}