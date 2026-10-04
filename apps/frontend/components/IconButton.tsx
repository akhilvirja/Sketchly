import { ReactNode } from "react";

export default function IconButton({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded transition-colors cursor-pointer flex items-center justify-center ${
        activated
          ? "bg-white text-black"
          : "text-zinc-400 hover:text-white hover:bg-zinc-900"
      }`}
    >
      {icon}
    </button>
  );
}