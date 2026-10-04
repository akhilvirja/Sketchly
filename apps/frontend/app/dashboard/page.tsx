"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { createRoom, getRoomDetails, getUserRooms, Room } from "../../services";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth({ requireAuth: true });

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  // Create room state
  const [newRoomName, setNewRoomName] = useState("");
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
      setCreateError("Room name must be between 3 and 20 characters.");
      return;
    }

    try {
      setCreateLoading(true);
      const roomId = await createRoom(trimmed);
      router.push(`/room/${roomId}`);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create room. It might already exist.";
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
      setJoinError("Please enter a room ID or slug.");
      return;
    }

    try {
      setJoinLoading(true);
      // Check if room exists
      const room = await getRoomDetails(trimmed);
      if (room) {
        router.push(`/room/${room.id}`);
      } else {
        // If not found by query, fallback if user typed a direct numeric ID
        const numericId = Number(trimmed);
        if (!isNaN(numericId)) {
          router.push(`/room/${numericId}`);
        } else {
          setJoinError("Room not found. Check the ID or name and try again.");
        }
      }
    } catch {
      setJoinError("Failed to look up room. Try again.");
    } finally {
      setJoinLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <p className="text-zinc-500 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight text-white hover:text-zinc-300">
            Sketchly
          </Link>
          <span className="text-xs px-2 py-0.5 border border-zinc-700 text-zinc-400 rounded">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-xs text-right hidden sm:block">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-zinc-500">{user.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="px-3 py-1.5 text-xs border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 rounded transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Create a collaborative whiteboard room or join an existing session.
          </p>
        </div>

        {/* Action Cards: Create & Join */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Create Room Card */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-1">Create New Room</h2>
            <p className="text-xs text-zinc-400 mb-4">
              Give your canvas room a unique name to launch a collaborative whiteboard.
            </p>

            {createError && (
              <div className="mb-4 p-2.5 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateRoom} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Room Name (3 - 20 chars)
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g. project-design"
                  required
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-2 bg-white text-black text-sm font-medium rounded hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {createLoading ? "Creating..." : "Create & Open Canvas"}
              </button>
            </form>
          </div>

          {/* Join Room Card */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-1">Join Room</h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter a room ID or slug shared by a collaborator to enter their room.
            </p>

            {joinError && (
              <div className="mb-4 p-2.5 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded">
                {joinError}
              </div>
            )}

            <form onSubmit={handleJoinRoom} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Room ID or Slug
                </label>
                <input
                  type="text"
                  value={joinInput}
                  onChange={(e) => setJoinInput(e.target.value)}
                  placeholder="e.g. 2 or project-design"
                  required
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={joinLoading}
                className="w-full py-2 bg-zinc-900 border border-zinc-700 text-white text-sm font-medium rounded hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {joinLoading ? "Joining..." : "Join Canvas"}
              </button>
            </form>
          </div>
        </div>

        {/* Your Rooms Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Canvas Rooms</h2>
            <button
              onClick={fetchRooms}
              className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Refresh
            </button>
          </div>

          {loadingRooms ? (
            <p className="text-sm text-zinc-500 py-4">Loading your rooms...</p>
          ) : rooms.length === 0 ? (
            <div className="border border-dashed border-zinc-800 p-8 rounded-lg text-center">
              <p className="text-sm text-zinc-400">You haven&apos;t created any rooms yet.</p>
              <p className="text-xs text-zinc-600 mt-1">
                Use the &quot;Create New Room&quot; form above to launch your first session.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="border border-zinc-800 bg-zinc-950 p-4 rounded-lg flex flex-col justify-between hover:border-zinc-600 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-500 font-mono">ID: #{room.id}</span>
                      <span className="text-[10px] text-zinc-500">
                        {room.createdAt ? new Date(room.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white break-words mb-4">
                      {room.slug}
                    </h3>
                  </div>

                  <Link
                    href={`/room/${room.id}`}
                    className="w-full text-center py-2 bg-white text-black text-xs font-medium rounded hover:bg-zinc-200 transition-colors block"
                  >
                    Open Canvas →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
