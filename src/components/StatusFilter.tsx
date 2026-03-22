interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  { value: "", label: "All" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Filter by status">
      {statuses.map((s) => (
        <button
          key={s.value}
          onClick={() => onChange(s.value)}
          role="radio"
          aria-checked={value === s.value}
          className={`
            px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95
            ${value === s.value
              ? "bg-primary/15 text-primary border-primary/30"
              : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-primary/20"
            }
          `}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
