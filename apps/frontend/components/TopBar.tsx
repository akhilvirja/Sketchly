"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Square, Circle } from "lucide-react";
import { Tool } from "./Canvas";

export default function Topbar({
  selectedTool,
  setSelectedTool,
  roomId,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
  roomId?: string;
}) {
  // Keyboard shortcuts for tools: L (Line), R (Rect), C (Circle), Esc (Dashboard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "l" || key === "1") {
        setSelectedTool("line");
      } else if (key === "r" || key === "2") {
        setSelectedTool("rect");
      } else if (key === "c" || key === "3") {
        setSelectedTool("circle");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedTool]);

  return (
    <header className="fixed top-4 inset-x-0 mx-auto w-full max-w-5xl px-4 z-50 pointer-events-none select-none font-mono">
      <div
        className="w-full flex items-center justify-between pointer-events-auto bg-[#101318] border border-white/10 p-1.5 shadow-2xl"
        style={{ boxShadow: "4px 4px 0px 0px #0c0e11" }}
      >
        {/* Dock Left: Back / Escape Action */}
        <div className="flex items-center space-x-2 pl-1">
          <Link
            href="/dashboard"
            className="group bg-[#13171d] hover:bg-[#1a1f26] border border-white/10 px-3 py-1.5 text-zinc-300 hover:text-[#ccff00] flex items-center space-x-2 transition-all cursor-pointer"
            title="Return to Dashboard (Esc)"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">DASHBOARD</span>
            <span className="bg-[#1a1f26] text-zinc-500 px-1 py-0.2 text-[9px]">ESC</span>
          </Link>
        </div>

        {/* Dock Center: Vector Tooling Selector */}
        <nav aria-label="Vector Drafting Tools" className="flex items-center bg-[#0c0e11] border border-white/10 p-1 space-x-1">
          {/* Line (L) */}
          <button
            onClick={() => setSelectedTool("line")}
            className={`relative p-2 flex items-center justify-center transition-all cursor-pointer ${
              selectedTool === "line"
                ? "bg-[#ccff00] text-[#0c0e11] font-bold shadow"
                : "text-zinc-400 hover:text-white hover:bg-[#13171d]"
            }`}
            title="Line Tool (L)"
            type="button"
          >
            <Minus size={16} />
            <span className={`absolute bottom-0 right-0.5 text-[8px] font-mono leading-none ${
              selectedTool === "line" ? "text-[#0c0e11] font-bold" : "text-zinc-500"
            }`}>
              L
            </span>
          </button>

          {/* Rectangle (R) */}
          <button
            onClick={() => setSelectedTool("rect")}
            className={`relative p-2 flex items-center justify-center transition-all cursor-pointer ${
              selectedTool === "rect"
                ? "bg-[#ccff00] text-[#0c0e11] font-bold shadow"
                : "text-zinc-400 hover:text-white hover:bg-[#13171d]"
            }`}
            title="Rectangle Tool (R)"
            type="button"
          >
            <Square size={16} />
            <span className={`absolute bottom-0 right-0.5 text-[8px] font-mono leading-none ${
              selectedTool === "rect" ? "text-[#0c0e11] font-bold" : "text-zinc-500"
            }`}>
              R
            </span>
          </button>

          {/* Circle (C) */}
          <button
            onClick={() => setSelectedTool("circle")}
            className={`relative p-2 flex items-center justify-center transition-all cursor-pointer ${
              selectedTool === "circle"
                ? "bg-[#ccff00] text-[#0c0e11] font-bold shadow"
                : "text-zinc-400 hover:text-white hover:bg-[#13171d]"
            }`}
            title="Circle Tool (C)"
            type="button"
          >
            <Circle size={16} />
            <span className={`absolute bottom-0 right-0.5 text-[8px] font-mono leading-none ${
              selectedTool === "circle" ? "text-[#0c0e11] font-bold" : "text-zinc-500"
            }`}>
              C
            </span>
          </button>
        </nav>

        {/* Dock Right: Collaborative Presence Room Pill */}
        <div className="flex items-center space-x-3 pr-1">
          {roomId && (
            <div className="flex items-center space-x-2 bg-[#0c0e11] border border-white/10 px-2.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-[#ccff00] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-[#ccff00]"></span>
              </span>
              <span className="text-[11px] text-zinc-200 tracking-wider font-mono font-bold">
                #{roomId}
              </span>
            </div>
          )}

          {/* Avatars Roster */}
          <div className="hidden sm:flex items-center -space-x-1.5 text-[10px]">
            <div
              className="w-6 h-6 bg-[#b6c9d8] text-[#0b1d29] font-bold flex items-center justify-center uppercase shadow border border-black"
              title="Sarah (Staff Eng)"
            >
              SE
            </div>
            <div
              className="w-6 h-6 bg-[#ccff00] text-[#0c0e11] font-bold flex items-center justify-center uppercase shadow border border-black"
              title="Active Operator"
            >
              OP
            </div>
            <div
              className="w-6 h-6 bg-[#282a2d] text-zinc-300 font-bold flex items-center justify-center shadow border border-black"
              title="Peers connected"
            >
              +1
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}