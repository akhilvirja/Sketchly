"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-zinc-300">
          Sketchly
        </Link>

        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-xs text-zinc-500">Loading...</span>
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-xs bg-white text-black font-medium rounded hover:bg-zinc-200 transition-colors"
            >
              Go to Dashboard ({user?.name || "Dashboard"}) →
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-3 py-1.5 text-xs border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 rounded transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 text-xs bg-white text-black font-medium rounded hover:bg-zinc-200 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-block px-3 py-1 border border-zinc-800 bg-zinc-950 rounded-full text-xs text-zinc-400 mb-6">
          Real-Time Collaborative Whiteboard
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight mb-6">
          Simple, fast collaborative drawing for your team.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10">
          Sketchly is a lightweight whiteboard. Create a room, share the ID or slug with your team, and brainstorm ideas in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={isAuthenticated ? "/dashboard" : "/signup"}
            className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold text-sm rounded hover:bg-zinc-200 transition-colors"
          >
            {isAuthenticated ? "Enter Dashboard" : "Get Started — It's Free"}
          </Link>
          <Link
            href={isAuthenticated ? "/dashboard" : "/signin"}
            className="w-full sm:w-auto px-6 py-3 border border-zinc-700 bg-zinc-950 text-white font-medium text-sm rounded hover:bg-zinc-900 hover:border-zinc-500 transition-colors"
          >
            {isAuthenticated ? "Join a Room" : "Sign In to Account"}
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-20 text-left">
          <div className="border border-zinc-800 bg-zinc-950 p-5 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Real-Time Sync</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Low-latency WebSocket syncing ensures everyone in the room sees shapes and edits instantly.
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Persistent Rooms</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every canvas session is securely backed up in PostgreSQL so your team never loses board history.
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Zero Bloat</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Lightweight HTML5 Canvas engine designed for speed and simplicity. No complex setups needed.
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-6 text-center text-xs text-zinc-500">
        Sketchly — Simple Real-Time Collaborative Canvas.
      </footer>
    </div>
  );
}
