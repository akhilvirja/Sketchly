"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import { createRoom, getRoomDetails, getUserRooms, Room } from "../../services";
import { PlusSquare, ArrowUpRight, LogIn, ArrowRight, RefreshCw, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth({ requireAuth: true });

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  // Create room state
  const [newRoomName, setNewRoomName] = useState("distributed-cache-v2");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Join room state
  const [joinInput, setJoinInput] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const userRooms = await getUserRooms();
      setRooms(userRooms);
    } catch {
      // Ignored
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchRooms();
    }
  }, [authLoading]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const trimmed = newRoomName.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
      setCreateError("Canvas identifier must be between 3 and 20 characters.");
      return;
    }

    try {
      setCreateLoading(true);
      const roomId = await createRoom(trimmed);
      router.push(`/room/${roomId}`);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Could not initialize canvas. Identifier may already exist in mesh.";
      setCreateError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);

    const trimmed = joinInput.trim();
    if (!trimmed) {
      setJoinError("Please enter a valid room PIN or slug.");
      return;
    }

    try {
      setJoinLoading(true);
      const room = await getRoomDetails(trimmed);
      if (room) {
        router.push(`/room/${room.id}`);
      } else {
        router.push(`/room/${trimmed}`);
      }
    } catch {
      router.push(`/room/${trimmed}`);
    } finally {
      setJoinLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-[#13171d]">
          <span className="w-2 h-2 bg-[#ccff00] animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider text-zinc-300">CALIBRATING COMMAND CENTER...</span>
        </div>
      </div>
    );
  }

  const userInitial = user?.name ? user.name.slice(0, 2).toUpperCase() : "US";
  const userName = user?.name || "System Architect";

  return (
    <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] font-mono text-xs flex flex-col justify-between selection:bg-[#ccff00] selection:text-[#0c0e11] relative overflow-x-hidden">
      {/* Precision Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#272C35_1px,transparent_1px),linear-gradient(to_bottom,#272C35_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* TOP NAVIGATION HUD */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#101318]/95 backdrop-blur-md border-b border-white/10">
        <div className="h-14 w-full px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-[#ccff00]"></div>
              <span className="font-sans text-base font-bold tracking-tight text-white uppercase">SKETCHLY</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider">
              <span>SYS:</span>
              <span className="text-zinc-300">LOC_01</span>
              <span>//</span>
              <span className="text-[#ccff00] flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 bg-[#ccff00] inline-block animate-pulse"></span>
                ONLINE_TELEMETRY
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
            <span className="text-[#ccff00] border-b-2 border-[#ccff00] pb-1 cursor-default">Studio</span>
            <Link href="/#interactive-demo" className="text-zinc-400 hover:text-white transition-colors">
              Engine Specs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-[#ccff00] transition-colors cursor-pointer"
            >
              Exit Node [Sign Out]
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1a1f26] border border-white/10 flex items-center justify-center font-bold text-[#ccff00] text-xs">
              {userInitial}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN COMMAND INTERFACE */}
      <main className="w-full pt-14 flex-1 z-10">
        <div className="flex flex-col w-full">
          {/* Command Strip / Upper Telemetry Bar */}
          <div className="w-full bg-[#101318] px-4 sm:px-8 py-2 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-500">
                <span className="text-zinc-300">WORKSPACE</span>
                <span>/</span>
                <span className="text-[#ccff00] font-bold">TELEMETRY & CANVASES</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 bg-[#13171d] border border-white/10 text-[10px] text-[#ccff00] font-bold">
                <span className="w-1.5 h-1.5 bg-[#ccff00] animate-pulse"></span>
                <span>ENGINE ONLINE</span>
              </div>
            </div>

            {/* User & Node Capsule */}
            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <span>LOC:</span>
                <span className="text-zinc-300 font-bold">FRA-02</span>
              </div>
              <div className="flex items-center gap-2 bg-[#13171d] border border-white/10 px-2.5 py-1">
                <div className="w-4 h-4 bg-[#1a1f26] flex items-center justify-center text-[#ccff00] font-bold text-[9px]">
                  {userInitial}
                </div>
                <span className="text-zinc-200 font-bold">{userName}</span>
                <span className="bg-[#ccff00] text-[#0c0e11] px-1 font-bold text-[9px] uppercase">
                  PRO
                </span>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:px-8 py-6 flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Welcome & Real-Time Stats Block */}
            <div className="bg-[#13171d] border border-white/10 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#1a1f26] border border-white/10 text-[#ccff00] text-[10px] uppercase tracking-widest font-bold">
                    STUDIO DASHBOARD
                  </span>
                  <span className="text-[10px] text-zinc-500">SYS_UPTIME: 142.8H</span>
                </div>
                <h1 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
                  Welcome back, {userName}
                </h1>
                <p className="text-zinc-400 text-xs max-w-xl leading-relaxed">
                  All canvas engines operational. Zero thread contention reported across edge websocket nodes. Active synchronizers primed for low-overhead collaboration.
                </p>
              </div>

              {/* Telemetry Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0c0e11] border border-white/10 p-2">
                <div className="bg-[#101318] p-3 flex flex-col border border-white/5">
                  <span className="text-[10px] text-zinc-500 uppercase">Active Canvases</span>
                  <span className="font-mono text-2xl text-white font-bold mt-1">
                    {String(rooms.length).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-[#ccff00] font-bold mt-1">● ALL NORMAL</span>
                </div>
                <div className="bg-[#101318] p-3 flex flex-col border border-white/5">
                  <span className="text-[10px] text-zinc-500 uppercase">Team Peers</span>
                  <span className="font-mono text-2xl text-white font-bold mt-1">12</span>
                  <span className="text-[10px] text-zinc-400 mt-1">IN 3 CHANNELS</span>
                </div>
                <div className="bg-[#101318] p-3 flex flex-col border border-white/5">
                  <span className="text-[10px] text-zinc-500 uppercase">Edge Latency</span>
                  <span className="font-mono text-2xl text-[#ccff00] font-bold mt-1">14.2ms</span>
                  <span className="text-[10px] text-zinc-400 mt-1">0% PACKET DROP</span>
                </div>
                <div className="bg-[#101318] p-3 flex flex-col border border-white/5">
                  <span className="text-[10px] text-zinc-500 uppercase">Shared Heap</span>
                  <span className="font-mono text-2xl text-white font-bold mt-1">3.8GB</span>
                  <span className="text-[10px] text-zinc-400 mt-1">CAP: 16.0 GB</span>
                </div>
              </div>
            </div>

            {/* Action Hub / Asymmetric Split Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Create New Canvas Box (7 cols) */}
              <div className="lg:col-span-7 bg-[#13171d] border border-white/10 p-5 sm:p-6 flex flex-col justify-between">
                <form onSubmit={handleCreateRoom} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <PlusSquare className="w-4 h-4 text-[#ccff00]" />
                      <span className="text-[11px] uppercase text-white font-bold tracking-wider">
                        Initialize Canvas Instance
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase">TYPE: CRDT_GRAPH</span>
                  </div>

                  {createError && (
                    <div className="bg-[#93000a]/30 border border-[#ffb4ab]/30 px-3 py-2 text-[#ffb4ab] text-[11px]">
                      {createError}
                    </div>
                  )}

                  {/* Monospace Slug Field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <label className="text-zinc-400 uppercase font-bold" htmlFor="canvas-slug-input">
                        CANVAS IDENTIFIER / SLUG
                      </label>
                      <span className="text-[#ccff00] font-mono">
                        {newRoomName.length}/20
                      </span>
                    </div>
                    <div className="flex items-center bg-[#0c0e11] border border-white/10 px-3 py-2">
                      <span className="text-zinc-500 select-none">slug/ </span>
                      <input
                        className="bg-transparent text-xs text-white focus:outline-none flex-1 tracking-wide font-mono"
                        id="canvas-slug-input"
                        maxLength={20}
                        placeholder="canvas-identifier-tag"
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                      />
                      <span className="w-1.5 h-3 bg-[#ccff00] animate-pulse"></span>
                    </div>
                  </div>

                  {/* Tag Pills */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-zinc-500 uppercase">PRESET TAXONOMY</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["team-sprint", "ui-wireframes", "system-design", "kernel-flow"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setNewRoomName(tag)}
                          className="px-2 py-1 bg-[#101318] hover:bg-[#1a1f26] border border-white/10 text-zinc-300 hover:text-[#ccff00] text-[10px] transition-colors cursor-pointer"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-1 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <span className="w-1.5 h-1.5 bg-[#ccff00]"></span>
                      <span>ENCRYPTED SHARD</span>
                    </div>
                    <button
                      disabled={createLoading}
                      className="bg-[#ccff00] hover:bg-[#b8e600] active:bg-[#a6d100] text-[#0c0e11] text-[11px] uppercase px-4 py-2 font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                      type="submit"
                    >
                      <span>{createLoading ? "SPAWNING..." : "Launch Canvas"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Join Session Box (5 cols) */}
              <div className="lg:col-span-5 bg-[#13171d] border border-white/10 p-5 sm:p-6 flex flex-col justify-between">
                <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <LogIn className="w-4 h-4 text-zinc-300" />
                      <span className="text-[11px] uppercase text-white font-bold tracking-wider">
                        Join Active Session
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#ccff00] bg-[#0c0e11] border border-white/10 px-2 py-0.5">
                      <span className="w-1.5 h-1.5 bg-[#ccff00]"></span>
                      <span>SYNC OK</span>
                    </div>
                  </div>

                  {joinError && (
                    <div className="bg-[#93000a]/30 border border-[#ffb4ab]/30 px-3 py-2 text-[#ffb4ab] text-[11px]">
                      {joinError}
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase font-bold" htmlFor="room-code-input">
                      ROOM PIN / PROTOCOL TOKEN
                    </label>
                    <div className="flex items-center bg-[#0c0e11] border border-white/10 px-3 py-2">
                      <span className="text-[#ccff00] font-bold select-none pr-2">#</span>
                      <input
                        className="bg-transparent text-xs text-white focus:outline-none flex-1 tracking-widest font-mono uppercase"
                        id="room-code-input"
                        placeholder="ROOM-ID OR SLUG"
                        type="text"
                        value={joinInput}
                        onChange={(e) => setJoinInput(e.target.value)}
                      />
                      <span className="px-1.5 py-0.5 bg-[#13171d] border border-white/10 text-zinc-400 text-[9px]">
                        HW-KEY
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      Requires verified Ed25519 cluster key credentials.
                    </p>
                  </div>

                  <div className="pt-3 mt-1 flex items-center justify-end border-t border-white/10">
                    <button
                      disabled={joinLoading}
                      className="w-full bg-[#1a1f26] hover:bg-[#242a34] border border-white/10 text-white text-[11px] uppercase px-4 py-2 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                      type="submit"
                    >
                      <span>{joinLoading ? "CONNECTING..." : "Enter Session"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Canvas Matrix Section */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-lg font-bold text-white uppercase tracking-tight">
                    Active Workspaces
                  </span>
                  <span className="px-2 py-0.5 bg-[#13171d] border border-white/10 text-zinc-400 text-[10px]">
                    {String(rooms.length).padStart(2, "0")} INSTANCES
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchRooms}
                    className="px-2.5 py-1 bg-[#13171d] border border-white/10 text-zinc-300 hover:text-[#ccff00] text-[10px] uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                  <div className="px-2.5 py-1 bg-[#1a1f26] border border-white/10 text-[#ccff00] text-[10px] uppercase font-bold">
                    Grid View
                  </div>
                </div>
              </div>

              {/* Workspaces Grid */}
              {loadingRooms ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-64 bg-[#13171d] border border-white/10 animate-pulse"></div>
                  ))}
                </div>
              ) : rooms.length === 0 ? (
                <div className="bg-[#13171d] border border-white/10 p-12 text-center flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#0c0e11] border border-white/10 text-[#ccff00] flex items-center justify-center mb-3">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-base font-bold text-white mb-1">
                    No active workspaces provisioned yet
                  </h3>
                  <p className="text-zinc-400 text-xs max-w-sm mb-4">
                    Initialize your first vector canvas instance using the identifier terminal above.
                  </p>
                  <button
                    onClick={() => {
                      setNewRoomName("team-sprint");
                      document.getElementById("canvas-slug-input")?.focus();
                    }}
                    className="px-4 py-2 bg-[#ccff00] text-[#0c0e11] font-bold text-xs hover:bg-[#b8e600] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Quick-Start #team-sprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rooms.map((room, idx) => (
                    <div
                      key={room.id}
                      className="bg-[#13171d] border border-white/10 flex flex-col justify-between hover:border-zinc-500 transition-colors group"
                    >
                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <span className="text-zinc-500">ID</span>
                            <span className="text-white font-bold">#{room.id}</span>
                          </div>
                          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#0c0e11] border border-white/10 text-[#ccff00] text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 bg-[#ccff00] animate-ping"></span>
                            <span>LIVE</span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <h2 className="font-sans text-sm font-bold text-white truncate group-hover:text-[#ccff00] transition-colors">
                            {room.slug || `Room ${room.id}`}
                          </h2>
                          <span className="text-[10px] text-zinc-500 mt-0.5">
                            CRDT NODE // HOST: {room.adminId ? `USR_${room.adminId}` : "ROOT"}
                          </span>
                        </div>

                        {/* Architectural Wireframe Preview Diagram */}
                        <div className="w-full h-28 bg-[#0c0e11] border border-white/5 p-2 flex items-center justify-center overflow-hidden">
                          <svg className="w-full h-full text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 200 100">
                            {idx % 2 === 0 ? (
                              <>
                                <rect fill="#13171d" height="20" stroke="currentColor" strokeWidth="1.2" width="46" x="77" y="10"></rect>
                                <text fill="#ccff00" fontFamily="monospace" fontSize="7" textAnchor="middle" x="100" y="23">INGRESS</text>
                                <path d="M 100 30 L 100 45 M 100 45 L 45 55 M 100 45 L 155 55" stroke="#3b4351" strokeDasharray="2 2" strokeWidth="1.2"></path>
                                <rect fill="#13171d" height="20" stroke="#e2e2e6" strokeWidth="1.2" width="40" x="25" y="55"></rect>
                                <text fill="#e2e2e6" fontFamily="monospace" fontSize="7" textAnchor="middle" x="45" y="68">NODE_01</text>
                                <rect fill="#13171d" height="20" stroke="#e2e2e6" strokeWidth="1.2" width="40" x="135" y="55"></rect>
                                <text fill="#e2e2e6" fontFamily="monospace" fontSize="7" textAnchor="middle" x="155" y="68">NODE_02</text>
                                <path d="M 45 75 L 100 88 M 155 75 L 100 88" stroke="#3b4351" strokeWidth="1.2"></path>
                                <circle cx="100" cy="88" fill="#ccff00" r="3.5"></circle>
                              </>
                            ) : (
                              <>
                                <circle cx="100" cy="48" r="28" stroke="#ccff00" strokeWidth="1.5" strokeDasharray="3 2"></circle>
                                <rect fill="#13171d" height="16" stroke="#ffffff" strokeWidth="1" width="36" x="82" y="40"></rect>
                                <text fill="#ffffff" fontFamily="monospace" fontSize="7" textAnchor="middle" x="100" y="51">CORE_BUS</text>
                                <path d="M 40 48 L 72 48 M 128 48 L 160 48" stroke="#3b4351" strokeWidth="1.2"></path>
                                <circle cx="36" cy="48" fill="#e2e2e6" r="3"></circle>
                                <circle cx="164" cy="48" fill="#ccff00" r="3"></circle>
                              </>
                            )}
                          </svg>
                        </div>
                      </div>

                      <div className="bg-[#101318] px-4 py-2.5 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {room.createdAt ? new Date(room.createdAt).toLocaleDateString() : "SYNC: ACTIVE"}
                        </span>
                        <Link
                          href={`/room/${room.id}`}
                          className="px-2.5 py-1 bg-[#13171d] hover:bg-[#ccff00] hover:text-[#0c0e11] border border-white/10 text-white font-bold text-[10px] uppercase flex items-center gap-1 transition-colors"
                        >
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER: Telemetry Hardware Status Bar */}
      <footer className="w-full bg-[#0c0e11] border-t border-white/10 z-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-[#ccff00] font-bold">LATENCY: &lt;14MS</span>
            <span className="text-zinc-800">|</span>
            <span>CLUSTER: FRA-02 MESH</span>
            <span className="text-zinc-800">|</span>
            <span>WEBSOCKET: ACTIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>UPTIME: 99.999%</span>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-300 font-bold">SKETCHLY STUDIO CONTROL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
