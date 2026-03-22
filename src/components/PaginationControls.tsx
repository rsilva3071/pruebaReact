import { ChevronUp, ChevronDown } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 pt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-border
          text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed
          hover:text-primary hover:border-primary/40 hover:bg-primary/5
          transition-all duration-200 active:scale-90"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      <span className="text-sm text-muted-foreground font-mono tabular-nums min-w-[80px] text-center">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-border
          text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed
          hover:text-primary hover:border-primary/40 hover:bg-primary/5
          transition-all duration-200 active:scale-90"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}
