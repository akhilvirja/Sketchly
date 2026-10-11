export default function Logo({
  size = 28,
  showText = true,
  className = "",
}: {
  size?: number;
  showText?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] group-hover:border-amber-400/40 transition-colors"
        style={{ width: size, height: size }}
      >
        <svg
          width={Math.round(size * 0.64)}
          height={Math.round(size * 0.64)}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main drafting geometry */}
          <rect
            x="3"
            y="3"
            width="12"
            height="12"
            rx="2.5"
            className="stroke-zinc-300"
            strokeWidth="2"
          />
          <rect
            x="9"
            y="9"
            width="12"
            height="12"
            rx="2.5"
            className="stroke-amber-400"
            strokeWidth="2"
            strokeDasharray="2 1"
          />
          <circle cx="15" cy="9" r="1.75" className="fill-amber-400" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-baseline gap-1.5">
          <span className="font-semibold tracking-tight text-white text-base">
            Sketchly
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-medium">
            Studio
          </span>
        </div>
      )}
    </div>
  );
}
