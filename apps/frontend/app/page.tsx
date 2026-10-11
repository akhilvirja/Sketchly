"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import {
  Minus,
  Square,
  Circle,
  Hand,
  DraftingCompass,
  Link2,
  Copy,
  Database,
  ArrowUpRight,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [activePreviewTool, setActivePreviewTool] = useState<"line" | "rect" | "circle" | "pan">("rect");
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [showPingDrawer, setShowPingDrawer] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinRoomInput, setJoinRoomInput] = useState("");

  const handleCopySlug = () => {
    navigator.clipboard.writeText("https://sketchly.studio/room/team-sprint").catch(() => {});
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = joinRoomInput.trim();
    if (trimmed) {
      router.push(`/room/${trimmed}`);
    }
  };

  return (
    <div className="bg-[#0c0e11] font-mono text-sm text-[#e2e2e6] dot-matrix-bg min-h-screen flex flex-col justify-between selection:bg-[#ccff00] selection:text-[#0c0e11] relative overflow-x-hidden">
      {/* HEADER: Crisp Modular Technical HUD */}
      <header className="fixed top-0 inset-x-0 z-50 pt-3 px-4 sm:px-8 pointer-events-none">
        <div className="h-14 max-w-5xl mx-auto px-4 bg-[#13171d]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl flex items-center justify-between pointer-events-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-6 h-6 relative shrink-0">
              <Image
                src="/stitch-logo.png"
                alt="Sketchly Studio Logo"
                width={24}
                height={24}
                className="h-6 w-auto object-contain filter brightness-110"
              />
            </div>
            <span className="font-sans tracking-tight font-bold text-white text-base">SKETCHLY</span>
            <span className="text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm bg-[#1a1f26] border border-white/10 text-[#ccff00] font-bold">
              V1.0.4-SYS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs">
            <Link
              href="/dashboard"
              className="transition-colors bg-[#1a1f26] text-white border border-white/10 px-3 py-1.5 rounded"
            >
              Studio Canvas
            </Link>
            <a
              href="#engine-specs"
              className="text-zinc-400 hover:text-white hover:bg-[#1a1f26]/60 transition-all px-3 py-1.5 rounded"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="text-zinc-400 hover:text-white hover:bg-[#1a1f26]/60 transition-all px-3 py-1.5 rounded"
            >
              Engine Specs
            </a>
            <a
              href="#interactive-demo"
              className="text-zinc-400 hover:text-white hover:bg-[#1a1f26]/60 transition-all px-3 py-1.5 rounded"
            >
              Interactive Demo
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0c0e11] border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span className="text-[11px] text-[#ccff00] font-bold tracking-tight">ENGINE ONLINE</span>
            </div>

            <div className="flex items-center pl-2 border-l border-white/10">
              {loading ? (
                <div className="w-7 h-7 bg-[#1a1f26] border border-white/10 rounded animate-pulse" />
              ) : isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2.5 py-1 bg-[#1a1f26] hover:bg-[#242a34] border border-white/10 rounded text-xs text-zinc-200 transition-colors"
                >
                  <div className="w-5 h-5 rounded-sm bg-[#ccff00] text-[#0c0e11] font-bold flex items-center justify-center text-[10px]">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:inline font-mono text-[11px]">Dashboard</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/signin"
                    className="text-xs text-zinc-300 hover:text-white px-2 py-1 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-2.5 py-1 bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0e11] font-bold text-xs rounded transition-colors"
                  >
                    Enter
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-16 flex-1">
        <div className="flex flex-col w-full">
          {/* HERO SECTION: Industrial Precision & High-Voltage Accent */}
          <section className="relative px-4 sm:px-8 pt-12 pb-16 overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              {/* Technical RFC Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#13171d] border border-white/10 mb-6 text-xs text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00]"></span>
                <span className="text-zinc-400">STATUS:</span>
                <span className="text-white font-bold">RFC 6455 DIRECT MESH</span>
                <span className="text-zinc-600">|</span>
                <span className="text-[#ccff00] font-bold">&lt;15ms SUB-FRAME</span>
              </div>

              {/* Stark Chalk-White Hero Headline */}
              <h1 className="font-sans text-4xl sm:text-6xl text-[#fafafa] font-bold max-w-4xl tracking-tight leading-[1.08]">
                Architectural sketching for <span className="text-[#ccff00]">mission-critical</span> product systems.
              </h1>

              {/* Technical Subhead */}
              <p className="mt-6 font-mono text-sm text-zinc-400 max-w-2xl leading-relaxed">
                Multiplayer vector whiteboard engineered with sub-50ms WebSocket sync, geometric drafting tools, and persistent room history. Zero UI fluff. Relentless execution.
              </p>

              {/* Sharp Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={isAuthenticated ? "/dashboard" : "/signup"}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0e11] font-sans font-bold text-sm tracking-tight transition-all active:scale-[0.98] shadow-[0_2px_10px_rgba(204,255,0,0.25)]"
                >
                  <span>Start Drawing Free</span>
                  <span className="w-5 h-5 rounded bg-[#0c0e11] text-[#ccff00] flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>

                <button
                  onClick={() => setJoinModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#13171d] hover:bg-[#1a1f26] border border-white/10 hover:border-zinc-600 text-zinc-200 font-sans font-medium text-sm transition-all active:scale-[0.98] cursor-pointer"
                  id="join-room-trigger"
                >
                  <span>Join Existing Room</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Telemetry Ticker Strip */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-5 text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#ccff00]"></span> 0% TELEMETRY OVERHEAD
                </span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-400">ZERO-INSTALL DRAFTING ENGINE</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-300 font-medium">CRDT STATE RECONCILIATION</span>
              </div>
            </div>

            {/* HERO SHOWCASE: Dark Graphite Terminal Chassis */}
            <div className="mt-12 max-w-5xl mx-auto">
              <div className="rounded-lg border border-white/10 bg-[#0c0e11] overflow-hidden shadow-2xl">
                {/* Top Bezel / Telemetry HUD */}
                <div className="h-10 px-4 bg-[#13171d] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]"></span>
                    <span className="ml-2 text-zinc-400 uppercase tracking-wider text-[11px] font-bold">
                      session://rf-engine-core.skly
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-1">
                      <span className="w-5 h-5 rounded bg-zinc-800 text-white font-bold flex items-center justify-center text-[10px] border border-zinc-700">
                        S
                      </span>
                      <span className="w-5 h-5 rounded bg-[#ccff00] text-[#0c0e11] font-bold flex items-center justify-center text-[10px] border border-black">
                        A
                      </span>
                      <span className="w-5 h-5 rounded bg-zinc-700 text-white font-bold flex items-center justify-center text-[10px] border border-zinc-600">
                        M
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400">3 peers</span>
                    <span className="text-zinc-700">|</span>
                    <div className="flex items-center gap-1.5 text-[#ccff00] text-[11px] font-bold px-2 py-0.5 rounded bg-[#0c0e11] border border-white/10">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                      <span>12ms PTT</span>
                    </div>
                  </div>
                </div>

                {/* Studio Drafting Surface */}
                <div
                  className="relative h-[480px] w-full bg-[#0e1117] canvas-grid-pattern overflow-hidden select-none"
                  id="hero-studio-canvas"
                >
                  {/* Floating Tool Dock */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-1.5 py-1 rounded bg-[#13171d] border border-white/10 flex items-center gap-1 shadow-lg">
                    <button
                      onClick={() => setActivePreviewTool("line")}
                      className={`px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1.5 cursor-pointer ${
                        activePreviewTool === "line"
                          ? "bg-[#ccff00] text-[#0c0e11] font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-[#1a1f26]"
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                      <span>Line [L]</span>
                    </button>
                    <button
                      onClick={() => setActivePreviewTool("rect")}
                      className={`px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1.5 cursor-pointer ${
                        activePreviewTool === "rect"
                          ? "bg-[#ccff00] text-[#0c0e11] font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-[#1a1f26]"
                      }`}
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>Rectangle [R]</span>
                    </button>
                    <button
                      onClick={() => setActivePreviewTool("circle")}
                      className={`px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1.5 cursor-pointer ${
                        activePreviewTool === "circle"
                          ? "bg-[#ccff00] text-[#0c0e11] font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-[#1a1f26]"
                      }`}
                    >
                      <Circle className="w-3.5 h-3.5" />
                      <span>Circle [C]</span>
                    </button>
                    <span className="h-4 w-px bg-zinc-800 mx-0.5"></span>
                    <button
                      onClick={() => setActivePreviewTool("pan")}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        activePreviewTool === "pan"
                          ? "bg-[#ccff00] text-[#0c0e11]"
                          : "text-zinc-400 hover:text-white hover:bg-[#1a1f26]"
                      }`}
                    >
                      <Hand className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* High-Precision Schematic Overlay SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <marker id="arrow-lime" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                        <path d="M 0 1 L 9 5 L 0 9 z" fill="#ccff00"></path>
                      </marker>
                      <marker id="arrow-zinc" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                        <path d="M 0 1 L 9 5 L 0 9 z" fill="#71717a"></path>
                      </marker>
                    </defs>

                    {/* Node 1: Ingestion Gateway */}
                    <rect fill="#13171d" height="84" rx="3" stroke="#27272a" strokeWidth="1" width="160" x="110" y="170"></rect>
                    <text fill="#ffffff" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="12" fontWeight="700" x="125" y="198">
                      INGEST_NODE_01
                    </text>
                    <text fill="#71717a" fontFamily="var(--font-space-mono), monospace" fontSize="10" x="125" y="218">
                      TCP :443 TLS WS
                    </text>
                    <circle cx="250" cy="185" fill="#ccff00" r="3.5"></circle>

                    {/* Active Drafting Stroke with Acid Lime Coordinates */}
                    <rect fill="#181d24" height="150" rx="3" width="220" x="390" y="130"></rect>
                    <rect fill="none" height="150" rx="3" stroke="#ccff00" strokeDasharray="4 3" strokeWidth="1.5" width="220" x="390" y="130"></rect>
                    <text fill="#ccff00" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.06em" x="410" y="160">
                      CRDT STATE MESH
                    </text>
                    <text fill="#e2e8f0" fontFamily="var(--font-space-mono), monospace" fontSize="11" x="410" y="184">
                      Epoch: 0x8FA4
                    </text>
                    <text fill="#94a3b8" fontFamily="var(--font-space-mono), monospace" fontSize="10" x="410" y="204">
                      Mode: Broadcast Vector
                    </text>

                    {/* Drafting Resize Anchor Pins */}
                    <rect fill="#ccff00" height="7" stroke="#0c0e11" strokeWidth="1" width="7" x="386.5" y="126.5"></rect>
                    <rect fill="#ccff00" height="7" stroke="#0c0e11" strokeWidth="1" width="7" x="606.5" y="126.5"></rect>
                    <rect fill="#ccff00" height="7" stroke="#0c0e11" strokeWidth="1" width="7" x="386.5" y="276.5"></rect>
                    <rect fill="#ccff00" height="7" stroke="#0c0e11" strokeWidth="1" width="7" x="606.5" y="276.5"></rect>

                    {/* High-Contrast Vector Connector */}
                    <path d="M 270 212 L 390 212" markerEnd="url(#arrow-lime)" stroke="#ccff00" strokeWidth="1.5"></path>
                    <rect fill="#0c0e11" height="16" rx="2" stroke="#ccff00" strokeWidth="1" width="68" x="294" y="204"></rect>
                    <text fill="#ccff00" fontFamily="var(--font-space-mono), monospace" fontSize="9" fontWeight="700" x="300" y="216">
                      &lt;15ms ACK
                    </text>

                    {/* Node 3: Storage Matrix */}
                    <rect fill="#13171d" height="100" rx="3" stroke="#27272a" strokeWidth="1" width="180" x="720" y="190"></rect>
                    <text fill="#ffffff" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="12" fontWeight="700" x="740" y="222">
                      POSTGRES WAL BUS
                    </text>
                    <text fill="#71717a" fontFamily="var(--font-space-mono), monospace" fontSize="10" x="740" y="244">
                      Append-only Delta
                    </text>
                    <circle cx="875" cy="210" fill="#71717a" r="3.5"></circle>
                    <path d="M 610 220 L 720 230" markerEnd="url(#arrow-zinc)" stroke="#71717a" strokeDasharray="3 3" strokeWidth="1.5"></path>
                  </svg>

                  {/* Sarah Cursor */}
                  <div className="absolute top-[215px] left-[255px] pointer-events-none flex flex-col items-start z-30">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.428z"></path>
                    </svg>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-[#13171d] border border-white/20 text-white font-mono text-[10px] font-bold">
                      sarah.peer
                    </span>
                  </div>

                  {/* Alex Cursor */}
                  <div className="absolute top-[260px] left-[595px] pointer-events-none flex flex-col items-start z-30">
                    <svg className="w-4 h-4 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.428z"></path>
                    </svg>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-[#ccff00] text-[#0c0e11] font-mono text-[10px] font-bold">
                      alex.design
                    </span>
                  </div>

                  {/* Bottom Tabular Inspector HUD */}
                  <div className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded bg-[#13171d] border border-white/10 font-mono text-[11px] text-zinc-300 flex items-center gap-3">
                    <span>X: 390.00 Y: 130.00</span>
                    <span className="text-zinc-700">|</span>
                    <span>W: 220 H: 150</span>
                    <span className="text-zinc-700">|</span>
                    <span className="text-[#ccff00] font-bold">ZOOM: 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* REPUTATION / ENTERPRISE DEPLOYMENT STRIP */}
          <section className="py-8 px-4 sm:px-8 bg-[#0c0e11] border-y border-white/10">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 uppercase tracking-widest text-center md:text-left font-mono">
                // DEPLOYED IN LATENCY-CRITICAL ENVIRONMENTS
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 text-zinc-400 font-sans font-bold text-sm tracking-widest">
                <span className="hover:text-white transition-colors cursor-default">VORTEX.IO</span>
                <span className="hover:text-white transition-colors cursor-default">KINETIC</span>
                <span className="hover:text-[#ccff00] transition-colors cursor-default">POLYGONAL</span>
                <span className="hover:text-white transition-colors cursor-default">AERO_LAB</span>
              </div>
            </div>
          </section>

          {/* BENTO GRID: Developer-Grade Precision Modules */}
          <section className="py-20 px-4 sm:px-8 relative" id="engine-specs">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 text-[#ccff00] font-mono text-xs tracking-wider uppercase mb-2 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                  <span>ENGINE ARCHITECTURE</span>
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl text-white font-bold tracking-tight">
                  Machined from first principles for instant vector concurrency.
                </h2>
              </div>

              {/* Bento Grid (12 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5" id="architecture">
                {/* Card 1: Sub-50ms WebSocket Broadcast (7 Cols) */}
                <div className="md:col-span-7 rounded-lg bg-[#13171d] border border-white/10 p-6 flex flex-col justify-between hover:border-zinc-600 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0c0e11] border border-white/10 text-zinc-300 font-mono">
                        PROTOCOL : RFC 6455
                      </span>
                      <span className="text-xs text-[#ccff00] font-mono font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span> 24ms AVG PTT
                      </span>
                    </div>
                    <h3 className="font-sans text-xl text-white font-bold mb-2">
                      Sub-50ms WebSocket Broadcast
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-lg font-mono">
                      Custom framing layer packing shape vectors and spatial coordinates into binary delta envelopes. Zero serialization friction across client mesh clusters.
                    </p>
                  </div>

                  {/* Telemetry Oscilloscope Visual */}
                  <div className="mt-6 rounded bg-[#0c0e11] border border-white/10 p-4">
                    <div className="flex items-center justify-between font-mono text-zinc-500 mb-2 text-xs">
                      <span>LATENCY OSCILLOSCOPE</span>
                      <span className="text-[#ccff00] font-bold">120 PKTS/S</span>
                    </div>
                    {/* Waveform SVG */}
                    <svg className="w-full h-16 overflow-visible" fill="none" viewBox="0 0 400 64">
                      <line stroke="#1a1f26" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="400" y1="16" y2="16"></line>
                      <line stroke="#1a1f26" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="400" y1="32" y2="32"></line>
                      <line stroke="#1a1f26" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="400" y1="48" y2="48"></line>
                      <path d="M0,40 Q40,24 80,36 T160,16 T240,32 T320,12 T400,28" fill="none" stroke="#ccff00" strokeLinecap="square" strokeWidth="1.8"></path>
                    </svg>
                    <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                      <span>SYNC_ACK: 0x82A1 [16B]</span>
                      <span className="text-zinc-500">DIFF_PAYLOAD: 34B</span>
                      <span className="text-[#ccff00] font-bold">JITTER: 0.8ms</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Precision 2D Canvas Engine (5 Cols) */}
                <div className="md:col-span-5 rounded-lg bg-[#13171d] border border-white/10 p-6 flex flex-col justify-between hover:border-zinc-600 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0c0e11] border border-white/10 text-zinc-300 font-mono">
                        MATH: EUCLIDE2 V2
                      </span>
                      <DraftingCompass className="w-5 h-5 text-zinc-400" />
                    </div>
                    <h3 className="font-sans text-xl text-white font-bold mb-2">
                      Precision 2D Canvas Engine
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                      Native math pipeline computing tangent intersections, center-anchored bounding arcs, and zero-distortion transformations at fixed 120 FPS.
                    </p>
                  </div>

                  {/* Math Terminal Block */}
                  <div className="mt-6 rounded bg-[#0c0e11] border border-white/10 p-4 font-mono">
                    <div className="text-[11px] text-zinc-400 font-bold mb-2">// VECTOR BINDING CALCULATION</div>
                    <div className="p-2.5 rounded bg-[#13171d] border border-white/5 text-zinc-300 text-xs leading-relaxed">
                      <div>r = √((x₂ - x₁)² + (y₂ - y₁)²)</div>
                      <div className="text-zinc-500">θ = atan2(dy, dx) [±0.0001 rad]</div>
                      <div className="text-[#ccff00] font-bold mt-1">SNAP: GRID_ALIGNED_28PX</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
                      <span>HARDWARE ACCELERATED</span>
                      <span className="text-zinc-300 font-bold">CANVAS 2D CONTEXT</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Instant Room Slugs (5 Cols) */}
                <div className="md:col-span-5 rounded-lg bg-[#13171d] border border-white/10 p-6 flex flex-col justify-between hover:border-zinc-600 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0c0e11] border border-white/10 text-[#ccff00] font-mono font-bold">
                        ZERO-AUTH ENTRY
                      </span>
                      <Link2 className="w-5 h-5 text-zinc-400" />
                    </div>
                    <h3 className="font-sans text-xl text-white font-bold mb-2">
                      Instant Room Slugs & URLs
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                      No account creation walls or invitation hurdles. Share an encrypted URL slug to instantly beam team members into the spatial session.
                    </p>
                  </div>

                  {/* Slug Input Module */}
                  <div className="mt-6 rounded bg-[#0c0e11] border border-white/10 p-4">
                    <label className="block font-mono text-[10px] text-zinc-500 mb-2">WORKSPACE IDENTIFIER</label>
                    <div className="flex items-center justify-between gap-2 p-2 rounded bg-[#13171d] border border-white/10">
                      <span className="font-mono text-xs text-zinc-300 truncate">
                        sketchly.studio/room/<span className="text-[#ccff00] font-bold">team-sprint</span>
                      </span>
                      <button
                        onClick={handleCopySlug}
                        className="px-3 py-1 rounded bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0e11] font-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedSlug ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                    <div className="mt-2.5 text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                      <span>PUBLIC WRITE LEASE ENABLED</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: PostgreSQL State Durability (7 Cols) */}
                <div className="md:col-span-7 rounded-lg bg-[#13171d] border border-white/10 p-6 flex flex-col justify-between hover:border-zinc-600 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0c0e11] border border-white/10 text-zinc-300 font-mono">
                        STORAGE DUAL-PIPELINE
                      </span>
                      <Database className="w-5 h-5 text-zinc-400" />
                    </div>
                    <h3 className="font-sans text-xl text-white font-bold mb-2">
                      PostgreSQL State Durability
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-lg font-mono">
                      Ephemeral changes sync in RAM while vector snapshots commit to transactional PostgreSQL tables. Instant reconnect replay guarantees no dropped strokes.
                    </p>
                  </div>

                  {/* Metrics Triple Chassis */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="rounded bg-[#0c0e11] border border-white/10 p-3 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono">SNAPSHOT LOG</span>
                      <span className="font-sans text-2xl text-white font-bold my-1">4.2M</span>
                      <span className="text-[10px] text-zinc-400 font-mono">COMMITTED DELTAS</span>
                    </div>
                    <div className="rounded bg-[#0c0e11] border border-white/10 p-3 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono">RECONNECT TIME</span>
                      <span className="font-sans text-2xl text-[#ccff00] font-bold my-1">&lt;30ms</span>
                      <span className="text-[10px] text-zinc-400 font-mono">REPLAY BUFFER</span>
                    </div>
                    <div className="rounded bg-[#0c0e11] border border-white/10 p-3 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono">INTEGRITY</span>
                      <span className="font-sans text-2xl text-white font-bold my-1">99.999%</span>
                      <span className="text-[10px] text-[#ccff00] font-mono font-bold">ZERO DRIFT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LIVE TESTING BENCHMARK BANNER / CTA STRIP */}
          <section className="py-16 px-4 sm:px-8" id="interactive-demo">
            <div className="max-w-5xl mx-auto rounded-lg bg-[#13171d] border border-white/10 p-8 sm:p-10 relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00] uppercase mb-2 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
                    <span>PRODUCTION BENCHMARK READY</span>
                  </div>
                  <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
                    Experience sub-50ms vector drafting in your browser.
                  </h2>
                  <p className="mt-2 text-zinc-400 text-xs max-w-md leading-relaxed font-mono">
                    No signup friction. Instantiate a session and share the room URL to test concurrency.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <Link
                    href={isAuthenticated ? "/dashboard" : "/signup"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0e11] font-sans font-bold text-sm tracking-tight transition-all active:scale-[0.98]"
                  >
                    <span>Launch Canvas Session</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setShowPingDrawer(!showPingDrawer)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded bg-[#0c0e11] hover:bg-[#1a1f26] border border-white/10 text-zinc-200 font-mono text-xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>{showPingDrawer ? "Hide Live Pings" : "Inspect WebSocket Pings"}</span>
                    {showPingDrawer ? (
                      <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Live Terminal Ping Log Drawer */}
              {showPingDrawer && (
                <div className="mt-6 pt-4 rounded bg-[#0c0e11] border border-white/10 p-4 font-mono text-xs text-zinc-300">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                    <span className="text-[#ccff00] font-bold flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                      LIVE REPLAY STREAM LOG
                    </span>
                    <span className="text-zinc-500 text-[10px]">BUFFER: 256/256 EVENTS</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      [10:42:01.012] <span className="text-zinc-400">WS_CONN_INIT</span> &gt; wss://sketchly.studio/v1/sync?room=team-sprint
                    </div>
                    <div>
                      [10:42:01.026] <span className="text-[#ccff00] font-bold">WS_HANDSHAKE_OK</span> &gt; 101 Switching Protocols (14ms)
                    </div>
                    <div>
                      [10:42:01.031] <span className="text-white">PEER_BROADCAST</span> &gt; peer_id: 0x9FA2 joined room
                    </div>
                    <div className="text-zinc-400">
                      [10:42:01.045] DELTA_ACK &gt; shape_id: rect_4821 committed to PostgreSQL WAL
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER: Telemetry Hardware Status Bar */}
      <footer className="w-full bg-[#0c0e11] border-t border-white/10 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-[#ccff00] font-bold">LATENCY: &lt;18MS</span>
            <span className="text-zinc-800">|</span>
            <span>SOCKET: RFC 6455 TLS</span>
            <span className="text-zinc-800">|</span>
            <span>FPS: 120 FIXED</span>
          </div>
          <div className="flex items-center gap-3">
            <span>BUILD: V1.0.4-STABLE</span>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-300 font-bold">SKETCHLY PRECISION SYSTEMS</span>
          </div>
        </div>
      </footer>

      {/* Quick Join Room Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#13171d] border border-white/20 p-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ccff00]"></span>
                DIRECT SESSION BEAM
              </span>
              <button
                onClick={() => setJoinModalOpen(false)}
                className="text-zinc-500 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ ESC
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-4 font-mono">
              Enter room numeric identifier or alphanumeric URL slug:
            </p>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <div className="flex items-center bg-[#0c0e11] border border-white/10 px-3 py-2">
                <span className="text-[#ccff00] font-bold mr-2">#</span>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="team-sprint or 12"
                  value={joinRoomInput}
                  onChange={(e) => setJoinRoomInput(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-zinc-600 focus:outline-none font-mono"
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJoinModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ccff00] text-[#0c0e11] font-bold text-xs hover:bg-[#b8e600] cursor-pointer"
                >
                  <span>Connect Session</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
