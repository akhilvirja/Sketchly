import { ReactNode } from "react";

export default function IconButton({
  icon,
  onClick,
  activated,
  title,
  shortcut,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
  title?: string;
  shortcut?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`group relative px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-[0.96] ${
        activated
          ? "bg-amber-400 text-zinc-950 font-semibold shadow-[0_0_20px_-3px_rgba(245,158,11,0.35)]"
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className="shrink-0">{icon}</span>
      {shortcut && (
        <span
          className={`font-mono text-[10px] px-1 py-0.2 rounded ${
            activated
              ? "bg-black/15 text-zinc-950 font-bold"
              : "text-zinc-500 group-hover:text-zinc-400 bg-white/5"
          }`}
        >
          {shortcut}
        </span>
      )}
    </button>
  );
}