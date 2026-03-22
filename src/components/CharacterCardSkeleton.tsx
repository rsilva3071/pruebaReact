export function CharacterCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="aspect-square animate-shimmer" />
      <div className="p-3 space-y-2.5">
        <div className="h-4 w-3/4 rounded animate-shimmer" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 rounded-full animate-shimmer" />
          <div className="h-8 w-8 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
