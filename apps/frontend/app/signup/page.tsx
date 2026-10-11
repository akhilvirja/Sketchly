"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signup } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { AlertTriangle, Building2, ArrowLeft, ArrowUpRight } from "lucide-react";

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

  // Dynamic Password Strength Telemetry
  const strengthScore = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = useMemo(() => {
    const labels = [
      "STRENGTH: N/A",
      "STRENGTH: WEAK",
      "STRENGTH: ACCEPTABLE",
      "STRENGTH: OPTIMAL",
      "STRENGTH: FORTIFIED",
    ];
    return labels[strengthScore];
  }, [strengthScore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please fill in all identity credentials.");
      return;
    }

    if (password.length < 6) {
      setError("Master password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await signup({ name, email, password });
      if (res.success) {
        router.push(redirectUrl);
      } else {
        setError(typeof res.message === "string" ? res.message : "Account registration failed.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to provision account. Work email may already exist.";
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
          <span className="text-xs uppercase tracking-wider text-zinc-300">PROVISIONING SESSION CLUSTER...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] font-mono text-xs flex flex-col justify-between p-4 md:p-8 relative overflow-hidden select-none selection:bg-[#ccff00] selection:text-[#0c0e11]">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#272C35_1px,transparent_1px),linear-gradient(to_bottom,#272C35_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Navigation Strip */}
      <header className="w-full flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-bold tracking-wider uppercase text-zinc-400 hover:text-[#ccff00] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#ccff00] group-hover:-translate-x-1 transition-transform" />
          <span>HOME</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-500 tracking-wider">
            <span>PORT: 443</span>
            <span className="text-zinc-700">/</span>
            <span>ZONE: US-EAST-01</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#13171d] border border-[#ccff00]/40">
            <span className="w-1.5 h-1.5 bg-[#ccff00] inline-block animate-pulse"></span>
            <span className="text-[10px] tracking-widest text-[#ccff00] font-bold">NODE: 01_ONLINE</span>
          </div>
        </div>
      </header>

      {/* Centered Machined Double-Bezel Form Canvas */}
      <div className="w-full flex items-center justify-center py-8 z-10">
        <div className="w-full max-w-md bg-[#0c0e11] border border-white/10 p-1 shadow-2xl relative">
          {/* Mechanical Fastener Accents */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#ccff00]"></div>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ccff00]"></div>
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#ccff00]"></div>
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ccff00]"></div>

          {/* Inner Bezel */}
          <div className="bg-[#13171d] border border-white/10 p-5 sm:p-7 flex flex-col gap-5">
            {/* Card Header & Eyebrow */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#ccff00] tracking-widest font-bold">
                  SPEC // ACCESS_PROVISION
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">AUTH_02.B</span>
              </div>
              <h1 className="font-sans text-2xl font-bold tracking-tight text-white mt-1">
                Create your Sketchly Studio account
              </h1>
              <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                Start drafting with your engineering team in seconds.
              </p>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="grid grid-cols-2 bg-[#0c0e11] p-1 border border-white/10">
              <Link
                href={`/signin${redirectUrl !== "/dashboard" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="text-center py-2 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors"
              >
                SIGN IN
              </Link>
              <div className="text-center py-2 text-[11px] font-bold bg-[#1a1f26] text-[#ccff00] border border-[#ccff00]/40">
                CREATE ACCOUNT
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-[#93000a]/30 border border-[#ffb4ab]/30 px-3 py-2.5 flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-[#ffb4ab] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#ffb4ab] font-bold tracking-wider uppercase">SYS.AUTH_ALERT</span>
                  <span className="text-[11px] text-[#ffb4ab] leading-snug">{error}</span>
                </div>
              </div>
            )}

            {/* Credential Entry Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Input: Full Name */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <label className="text-zinc-300 font-bold tracking-wider" htmlFor="name">
                    FULL NAME
                  </label>
                  <span className="text-zinc-500">REQ: UTF-8</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="w-full bg-[#0c0e11] border border-white/10 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors"
                    id="name"
                    placeholder="Elena Rostova"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Input: Work Email */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <label className="text-zinc-300 font-bold tracking-wider" htmlFor="email">
                    WORK EMAIL
                  </label>
                  <span className="text-zinc-500">ROUTING</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="w-full bg-[#0c0e11] border border-white/10 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors"
                    id="email"
                    placeholder="name@company.design"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Input: Password & Strength Telemetry */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <label className="text-zinc-300 font-bold tracking-wider" htmlFor="password">
                    MASTER PASSWORD
                  </label>
                  <span
                    className={
                      strengthScore >= 3 ? "text-[#ccff00] font-bold" : "text-zinc-400 font-mono"
                    }
                  >
                    {strengthLabel}
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="w-full bg-[#0c0e11] border border-white/10 px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors tracking-widest"
                    id="password"
                    placeholder="••••••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Segmented Strength Meter */}
                <div className="grid grid-cols-4 gap-1.5 mt-1">
                  <div
                    className={`h-1 transition-colors duration-150 ${
                      strengthScore >= 1 ? "bg-[#ccff00]" : "bg-[#1f242c]"
                    }`}
                  ></div>
                  <div
                    className={`h-1 transition-colors duration-150 ${
                      strengthScore >= 2 ? "bg-[#ccff00]" : "bg-[#1f242c]"
                    }`}
                  ></div>
                  <div
                    className={`h-1 transition-colors duration-150 ${
                      strengthScore >= 3 ? "bg-[#ccff00]" : "bg-[#1f242c]"
                    }`}
                  ></div>
                  <div
                    className={`h-1 transition-colors duration-150 ${
                      strengthScore >= 4 ? "bg-[#ccff00]" : "bg-[#1f242c]"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Primary Action Trigger */}
              <button
                className="w-full mt-2 bg-[#ccff00] text-[#0c0e11] font-bold text-xs py-3 px-4 border border-[#ccff00] hover:bg-[#b8e600] active:bg-[#a6d100] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                disabled={loading}
                type="submit"
              >
                <span>{loading ? "PROVISIONING INSTANCE..." : "Create Account & Enter"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider Matrix */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-[10px] text-zinc-500 uppercase tracking-widest">
                FEDERATED AUTH
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* SSO Auxiliary Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#101318] border border-white/10 text-zinc-300 text-[10px] font-bold tracking-wider uppercase hover:border-[#ccff00] hover:text-[#ccff00] transition-colors cursor-pointer"
                type="button"
                onClick={() => setError("GitHub enterprise connector active in production cluster.")}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
                </svg>
                <span>GITHUB</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#101318] border border-white/10 text-zinc-300 text-[10px] font-bold tracking-wider uppercase hover:border-[#ccff00] hover:text-[#ccff00] transition-colors cursor-pointer"
                type="button"
                onClick={() => setError("SAML SSO identity provider awaiting corporate domain match.")}
              >
                <Building2 size={14} />
                <span>SAML SSO</span>
              </button>
            </div>

            {/* Protocol Terms & Latency Metatag */}
            <div className="border-t border-white/10 pt-3 flex flex-col gap-1 text-center">
              <p className="text-[10px] text-zinc-500">
                By authenticating, you agree to the{" "}
                <span className="text-zinc-400 underline cursor-pointer hover:text-[#ccff00]">Terms of Protocol</span> and{" "}
                <span className="text-zinc-400 underline cursor-pointer hover:text-[#ccff00]">Privacy Perimeter</span>.
              </p>
              <div className="text-[9px] text-zinc-600 tracking-widest uppercase mt-0.5">
                SEC_BUILD_V4.8.2 // LATENCY: ~12MS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Footer System Status */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[10px] border-t border-white/10 pt-3 gap-2 z-10">
        <div className="flex items-center gap-3">
          <span>FRAME: SKETCHLY-SYS.CORE</span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline">ZERO-TRUST SECURE</span>
        </div>
        <div>
          <span>DEPLOYMENT // PROD-STK-09</span>
        </div>
      </footer>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0c0e11] text-[#e2e2e6] flex items-center justify-center font-mono">
          <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-[#13171d]">
            <span className="w-2 h-2 bg-[#ccff00] animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-zinc-300">PROVISIONING SESSION CLUSTER...</span>
          </div>
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
