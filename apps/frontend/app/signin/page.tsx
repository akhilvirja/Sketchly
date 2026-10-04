"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signin } from "../../services";
import { useAuth } from "../../hooks/useAuth";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { loading: authLoading } = useAuth({ guestOnly: true, redirectTo: redirectUrl });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await signin({ email, password });
      if (res.token) {
        router.push(redirectUrl);
      } else {
        setError(typeof res.message === "string" ? res.message : "Sign in failed.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <p className="text-zinc-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 p-8 rounded-lg shadow-sm">
        <div className="mb-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-zinc-300">
            Sketchly
          </Link>
          <h1 className="text-2xl font-semibold text-white mt-4">Sign In</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Enter your credentials to access your dashboard and canvas rooms.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-300 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white text-black font-medium text-sm rounded hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white underline hover:text-zinc-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
          <p className="text-zinc-500 text-sm">Loading...</p>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
