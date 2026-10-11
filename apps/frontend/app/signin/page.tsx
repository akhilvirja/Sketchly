"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signin } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import {
  ArrowLeft,
  AlertTriangle,
  AtSign,
  Eye,
  EyeOff,
  ArrowUpRight,
  Lock,
} from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { loading: authLoading } = useAuth({ guestOnly: true, redirectTo: redirectUrl });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberHardware, setRememberHardware] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please verify your workspace email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await signin({ email, password });
      if (res.token) {
        router.push(redirectUrl);
      } else {
        setError(typeof res.message === "string" ? res.message : "Authentication rejected.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid credentials. Please verify your workspace email and password.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-[#13171d]">
          <span className="w-2 h-2 bg-[#ccff00] animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider text-zinc-300">INITIALIZING SECURITY PERIMETER...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] font-mono text-xs flex flex-col justify-between selection:bg-[#ccff00] selection:text-[#0c0e11] relative overflow-x-hidden">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#272C35_1px,transparent_1px),linear-gradient(to_bottom,#272C35_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Grid Matrix Header */}
      <header className="w-full bg-[#101318] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#ccff00] transition-colors font-bold tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>BACK TO HOME [ESC]</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-zinc-400 hidden sm:inline-block tracking-wider">
            SKETCHLY STUDIO / SYS.AUTH // REL.24
          </span>
          <div className="w-2 h-2 bg-[#ccff00] animate-pulse"></div>
        </div>
      </header>

      {/* Auth Stage Container */}
      <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 z-10">
        {/* Double-Bezel Primary Chassis */}
        <div className="w-full max-w-md bg-[#0c0e11] border border-white/10 shadow-2xl relative">
          {/* Machined Outer Framing Accent */}
          <div className="w-full bg-[#101318] p-1">
            {/* Inner Core Panel */}
            <div className="w-full bg-[#13171d] p-5 sm:p-7 flex flex-col gap-4 border border-white/5">
              {/* Hardware Telemetry Status Pill */}
              <div className="flex items-center justify-between bg-[#0c0e11] px-3 py-1.5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ccff00]"></span>
                  <span className="text-[10px] text-[#ccff00] font-bold tracking-wider">GATEWAY ONLINE</span>
                </div>
                <span className="text-[10px] text-zinc-400 tracking-wider">REG-NODE // US-E</span>
              </div>

              {/* Editorial Header Title */}
              <div className="flex flex-col gap-1 mt-1">
                <h1 className="font-sans text-2xl font-bold tracking-tight text-white">
                  Sign in to Sketchly
                </h1>
                <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                  Access your collaborative boards and team canvases.
                </p>
              </div>

              {/* Segmented Tab Toggle */}
              <div className="grid grid-cols-2 bg-[#0c0e11] p-1 border border-white/10">
                <div className="py-2 px-3 text-[11px] font-bold text-[#0c0e11] bg-[#ccff00] flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#0c0e11]"></span>
                  <span>SIGN IN</span>
                </div>
                <Link
                  href={`/signup${redirectUrl !== "/dashboard" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                  className="py-2 px-3 text-[11px] font-bold text-zinc-400 hover:text-white bg-transparent flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>CREATE ACCOUNT</span>
                </Link>
              </div>

              {/* Contextual Error/Notice Banner */}
              {error && (
                <div className="bg-[#93000a]/30 border border-[#ffb4ab]/30 px-3 py-2.5 flex items-start gap-2.5">
                  <AlertTriangle size={15} className="text-[#ffb4ab] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#ffb4ab] font-bold tracking-wider uppercase">SYS.AUTH_ALERT</span>
                    <span className="text-[11px] text-[#ffb4ab] leading-snug">{error}</span>
                  </div>
                </div>
              )}

              {/* Form Module */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <label className="text-zinc-300 font-bold tracking-wider" htmlFor="email">
                      WORK EMAIL
                    </label>
                    <span className="text-[#ccff00] bg-[#0c0e11] border border-white/10 px-1.5 py-0.5 font-bold tracking-widest">
                      SSO ENABLED
                    </span>
                  </div>
                  <div className="relative bg-[#0c0e11] border border-white/10 flex items-center">
                    <input
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <AtSign size={14} className="text-zinc-500 mr-3 shrink-0" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <label className="text-zinc-300 font-bold tracking-wider" htmlFor="password">
                      MASTER PASSWORD
                    </label>
                    <span className="text-zinc-400 hover:text-[#ccff00] cursor-pointer transition-colors underline decoration-zinc-700 underline-offset-4">
                      Recover key?
                    </span>
                  </div>
                  <div className="relative bg-[#0c0e11] border border-white/10 flex items-center">
                    <input
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors"
                      id="password"
                      name="password"
                      placeholder="••••••••••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="px-3 py-2.5 text-zinc-400 hover:text-white transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Hardware Identity Checkbox */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <button
                    aria-checked={rememberHardware}
                    className={`w-4 h-4 flex items-center justify-center shrink-0 border ${
                      rememberHardware ? "bg-[#ccff00] border-[#ccff00]" : "bg-[#0c0e11] border-zinc-700"
                    } focus:outline-none cursor-pointer`}
                    role="checkbox"
                    type="button"
                    onClick={() => setRememberHardware(!rememberHardware)}
                  >
                    {rememberHardware && <span className="w-2 h-2 bg-[#0c0e11]"></span>}
                  </button>
                  <label
                    className="text-[10px] text-zinc-300 select-none cursor-pointer tracking-wider"
                    onClick={() => setRememberHardware(!rememberHardware)}
                  >
                    REMEMBER HARDWARE IDENTITY (30 DAYS)
                  </label>
                </div>

                {/* Primary High-Voltage Execution CTA */}
                <button
                  className="w-full bg-[#ccff00] hover:bg-[#b8e600] active:bg-[#a6d100] text-[#0c0e11] font-bold text-xs py-3 px-4 flex items-center justify-center gap-2 transition-transform active:scale-[0.99] group mt-1 cursor-pointer disabled:opacity-50"
                  disabled={loading}
                  type="submit"
                >
                  <span>{loading ? "AUTHENTICATING NODE..." : "SIGN IN TO STUDIO"}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>

              {/* Hardware Divider */}
              <div className="relative flex py-1 items-center justify-center my-1">
                <div className="w-full h-px bg-white/10"></div>
                <span className="shrink-0 bg-[#13171d] px-3 text-[10px] text-zinc-500 uppercase tracking-widest">
                  OR OPERATE VIA
                </span>
                <div className="w-full h-px bg-white/10"></div>
              </div>

              {/* Federated Sign In Triggers */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="w-full bg-[#101318] hover:bg-[#1a1f26] border border-white/10 py-2.5 px-3 flex items-center justify-center gap-2 text-zinc-300 hover:text-white transition-colors group cursor-pointer"
                  type="button"
                  onClick={() => setError("Federated enterprise SSO configured for manual bypass.")}
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5 fill-current text-zinc-400 group-hover:text-[#ccff00] transition-colors" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                  </svg>
                  <span className="text-[10px] font-bold tracking-wider">GITHUB</span>
                </button>
                <button
                  className="w-full bg-[#101318] hover:bg-[#1a1f26] border border-white/10 py-2.5 px-3 flex items-center justify-center gap-2 text-zinc-300 hover:text-white transition-colors group cursor-pointer"
                  type="button"
                  onClick={() => setError("Federated Google Workspace SSO configured for manual bypass.")}
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5 fill-current text-zinc-400 group-hover:text-[#ccff00] transition-colors" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                  </svg>
                  <span className="text-[10px] font-bold tracking-wider">GOOGLE</span>
                </button>
              </div>

              {/* Bottom Micro-Status Metric Bar */}
              <div className="mt-2 bg-[#0c0e11] border border-white/10 p-2.5 flex items-center justify-between text-[10px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-[#ccff00]" />
                  <span className="font-bold tracking-wider">SESSION: SECURE</span>
                </div>
                <span className="font-mono text-zinc-500">HASH: 4F92::EA1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Infrastructure Footer */}
        <footer className="mt-6 text-center flex flex-col items-center gap-1.5 max-w-md">
          <p className="text-[11px] text-zinc-500 flex items-center justify-center flex-wrap gap-x-2">
            <span>End-to-End Encrypted Session</span>
            <span>•</span>
            <span>TLS 1.3</span>
            <span>•</span>
            <span className="text-zinc-300">256-BIT</span>
          </p>
          <p className="text-[10px] text-zinc-600 tracking-wider uppercase font-bold">
            SKETCHLY SYSTEMS LLC • CALIBRATED FOR PRECISION WORKFLOWS
          </p>
        </footer>
      </div>
    </div>
  );
}


export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] flex items-center justify-center font-mono">
          <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-[#13171d]">
            <span className="w-2 h-2 bg-[#ccff00] animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-zinc-300">INITIALIZING SECURITY PERIMETER...</span>
          </div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
