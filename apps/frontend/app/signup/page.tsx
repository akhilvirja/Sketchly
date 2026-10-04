"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signup } from "../../services";
import { useAuth } from "../../hooks/useAuth";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { loading: authLoading } = useAuth({ guestOnly: true, redirectTo: redirectUrl });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await signup({ name, email, password });

      if (res.success) {
        router.push(redirectUrl);
      } else {
        const msg = typeof res.message === "string" ? res.message : "Account creation failed.";
        setError(msg);
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create account.";
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
          <h1 className="text-2xl font-semibold text-white mt-4">Create Account</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Register to create canvas rooms and collaborate in real-time.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-300 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Doe"
              required
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>

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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-white underline hover:text-zinc-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
          <p className="text-zinc-500 text-sm">Loading...</p>
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
