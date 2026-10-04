import Link from "next/link";
import { Circle, Pencil, RectangleHorizontalIcon, ArrowLeft } from "lucide-react";
import { Tool } from "./Canvas";
import IconButton from "./IconButton";

export default function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        left: 12,
      }}
      className="flex items-center gap-2 z-50 select-none"
    >
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-md text-xs font-medium transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Dashboard</span>
      </Link>

      <div className="flex gap-1 border border-zinc-800 bg-zinc-950 p-1 rounded-md">
        <IconButton
          onClick={() => setSelectedTool("pencil")}
          activated={selectedTool === "pencil"}
          icon={<Pencil size={18} />}
        />
        <IconButton
          onClick={() => setSelectedTool("rect")}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon size={18} />}
        />
        <IconButton
          onClick={() => setSelectedTool("circle")}
          activated={selectedTool === "circle"}
          icon={<Circle size={18} />}
        />
      </div>
    </div>
  );
}