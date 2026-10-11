"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "../draw/Game";
import Topbar from "./TopBar";
import { Map, Crosshair, Minus, Plus, Grid } from "lucide-react";

export type Tool = "circle" | "rect" | "line";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("rect");
  const [coords, setCoords] = useState({ x: 1024, y: 768 });
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [selectedColor, setSelectedColor] = useState<string>("#ccff00");
  const [snapEnabled, setSnapEnabled] = useState(true);

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const g = new Game(canvas, roomId, socket);
      setGame(g);

      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          g.clearCanvas();
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        g.destroy();
      };
    }
  }, [socket, roomId]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0e11] select-none font-mono">
      {/* Coordinate Grid Scale Identifiers */}
      <div className="absolute top-3 left-4 pointer-events-none flex items-center space-x-3 text-zinc-500 text-[10px] uppercase tracking-wider z-20">
        <span className="text-zinc-400 font-bold">CANVAS://ROOM_{roomId}</span>
        <span>|</span>
        <span>X: {coords.x}.00 Y: {coords.y}.00</span>
        <span>|</span>
        <span className="text-[#ccff00] font-bold">GRID: 28PX SYNCHRONIZED</span>
      </div>

      {/* Main Canvas Context */}
      <canvas ref={canvasRef} className="block cursor-crosshair" />

      {/* Floating Top-Center Dock */}
      <Topbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
        roomId={roomId}
      />

      {/* BOTTOM FLOATING CONTROLS DOCK */}
      <footer className="absolute bottom-4 inset-x-0 px-6 z-40 pointer-events-none flex items-end justify-between">
        {/* BOTTOM LEFT: Blueprint Minimap & Viewport Scale */}
        <div
          className="pointer-events-auto bg-[#101318] border border-white/10 p-2.5 space-y-2 w-56 shadow-2xl"
          style={{ boxShadow: "4px 4px 0px 0px #0c0e11" }}
        >
          <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase">
            <span className="flex items-center space-x-1">
              <Map className="w-3 h-3 text-zinc-400" />
              <span className="font-bold">MINIMAP</span>
            </span>
            <span className="text-[#ccff00] font-bold">100%</span>
          </div>

          {/* Minimap Screen Frame */}
          <div className="relative w-full h-20 bg-[#0c0e11] border border-white/5 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            ></div>
            <div className="absolute w-5 h-3 bg-[#1a1f26]" style={{ top: "18px", left: "14px" }}></div>
            <div className="absolute w-5 h-3 bg-[#1a1f26]" style={{ top: "18px", left: "38px" }}></div>
            <div className="absolute w-5 h-3 bg-[#1a1f26]" style={{ top: "42px", left: "18px" }}></div>
            <div className="absolute w-6 h-3 bg-[#ccff00]" style={{ top: "17px", left: "64px" }}></div>
            <div className="absolute inset-1.5 outline outline-1 outline-[#ccff00] bg-[#ccff00]/5 pointer-events-none"></div>
          </div>

          {/* Viewport Controls */}
          <div className="flex items-center justify-between pt-1 text-[10px]">
            <button
              onClick={() => game?.clearCanvas()}
              className="bg-[#13171d] hover:bg-[#1a1f26] border border-white/10 px-2 py-0.5 text-zinc-300 hover:text-[#ccff00] uppercase flex items-center space-x-1 transition-colors cursor-pointer"
              type="button"
            >
              <Crosshair className="w-3 h-3" />
              <span>REFRESH [⌘0]</span>
            </button>
            <div className="flex items-center space-x-1">
              <button
                className="bg-[#13171d] hover:bg-[#1a1f26] border border-white/10 p-0.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
                type="button"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                className="bg-[#13171d] hover:bg-[#1a1f26] border border-white/10 p-0.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
                type="button"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM CENTER: Drafting Attributes (Swatches & Stroke Weights) */}
        <div
          className="hidden md:flex pointer-events-auto bg-[#101318] border border-white/10 p-2 items-center space-x-4 shadow-2xl"
          style={{ boxShadow: "4px 4px 0px 0px #0c0e11" }}
        >
          {/* Color Swatches Palette */}
          <div className="flex items-center space-x-1.5 pl-1">
            <span className="text-[10px] text-zinc-500 uppercase mr-1">STROKE</span>
            {/* White Swatch */}
            <button
              onClick={() => setSelectedColor("#ffffff")}
              className={`w-5 h-5 bg-[#ffffff] transition-transform hover:scale-105 relative cursor-pointer ${
                selectedColor === "#ffffff" ? "outline outline-2 outline-offset-1 outline-white" : ""
              }`}
              title="White (#FFFFFF)"
              type="button"
            ></button>
            {/* Acid Lime Swatch */}
            <button
              onClick={() => setSelectedColor("#ccff00")}
              className={`w-5 h-5 bg-[#ccff00] relative cursor-pointer ${
                selectedColor === "#ccff00"
                  ? "outline outline-2 outline-offset-1 outline-[#ccff00]"
                  : ""
              }`}
              title="Acid Lime (#CCFF00)"
              type="button"
            >
              <span className="absolute inset-1 bg-[#0c0e11]"></span>
            </button>
            {/* Mint Swatch */}
            <button
              onClick={() => setSelectedColor("#d2e5f5")}
              className={`w-5 h-5 bg-[#d2e5f5] transition-transform hover:scale-105 cursor-pointer ${
                selectedColor === "#d2e5f5" ? "outline outline-2 outline-offset-1 outline-[#d2e5f5]" : ""
              }`}
              title="Mint (#D2E5F5)"
              type="button"
            ></button>
            {/* Charcoal Swatch */}
            <button
              onClick={() => setSelectedColor("#282a2d")}
              className={`w-5 h-5 bg-[#282a2d] transition-transform hover:scale-105 cursor-pointer ${
                selectedColor === "#282a2d" ? "outline outline-2 outline-offset-1 outline-zinc-400" : ""
              }`}
              title="Charcoal (#282A2D)"
              type="button"
            ></button>
          </div>

          <div className="h-5 w-px bg-white/10"></div>

          {/* Stroke Width Selector */}
          <div className="flex items-center space-x-1 pr-1 text-[10px]">
            <button
              onClick={() => setStrokeWidth(1)}
              className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                strokeWidth === 1
                  ? "bg-[#ccff00] text-[#0c0e11] font-bold border-[#ccff00]"
                  : "bg-[#13171d] text-zinc-400 hover:text-white border-white/10"
              }`}
              type="button"
            >
              1PX
            </button>
            <button
              onClick={() => setStrokeWidth(2)}
              className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                strokeWidth === 2
                  ? "bg-[#ccff00] text-[#0c0e11] font-bold border-[#ccff00]"
                  : "bg-[#13171d] text-zinc-400 hover:text-white border-white/10"
              }`}
              type="button"
            >
              2PX
            </button>
            <button
              onClick={() => setStrokeWidth(4)}
              className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                strokeWidth === 4
                  ? "bg-[#ccff00] text-[#0c0e11] font-bold border-[#ccff00]"
                  : "bg-[#13171d] text-zinc-400 hover:text-white border-white/10"
              }`}
              type="button"
            >
              4PX
            </button>
          </div>

          <div className="h-5 w-px bg-white/10"></div>

          {/* Orthogonal Grid Snap Toggle */}
          <button
            onClick={() => setSnapEnabled(!snapEnabled)}
            className={`flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold uppercase transition-colors cursor-pointer border ${
              snapEnabled
                ? "bg-[#13171d] text-[#ccff00] border-[#ccff00]/40"
                : "bg-[#13171d] text-zinc-500 border-white/10"
            }`}
            type="button"
          >
            <Grid className="w-3 h-3" />
            <span>SNAP: {snapEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* BOTTOM RIGHT: High Precision Live Telemetry HUD */}
        <div
          className="pointer-events-auto bg-[#101318] border border-white/10 shadow-2xl px-3 py-2 flex items-center space-x-3 text-[10px]"
          style={{ boxShadow: "4px 4px 0px 0px #0c0e11" }}
        >
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 bg-[#ccff00] animate-pulse"></span>
            <span className="text-white font-bold tracking-wider">WS CONNECTED</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="text-zinc-400">
            PING: <span className="text-[#ccff00] font-bold">12ms</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="text-zinc-400">
            RENDER: <span className="text-[#ccff00] font-bold">60 FPS</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="text-zinc-500 uppercase">MEM: 24.8MB</div>
        </div>
      </footer>
    </div>
  );
}