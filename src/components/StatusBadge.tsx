import type { Character } from "@/types/character";

interface StatusBadgeProps {
  status: Character["status"];
}

const statusConfig = {
  Alive: { label: "LIVE", className: "bg-background/80 text-status-alive border-status-alive/30" },
  Dead: { label: "DEAD", className: "bg-background/80 text-status-dead border-status-dead/30" },
  unknown: { label: "UNKNOWN", className: "bg-background/80 text-status-unknown border-status-unknown/30" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${config.className}`}>
      <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
      {config.label}
    </span>
  );
}
