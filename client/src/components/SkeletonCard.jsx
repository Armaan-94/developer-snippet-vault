/**
 * Loading placeholder that mirrors the SnippetCard layout, with a sweeping
 * shimmer. Shown while the initial fetch is in flight so the grid never
 * flashes empty.
 */
function SkeletonLine({ className = "" }) {
  return <div className={`rounded-md bg-white/[0.05] ${className}`} />;
}

function SkeletonCard() {
  return (
    <div className="surface relative h-full overflow-hidden rounded-2xl p-5 shadow-card">
      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="w-full space-y-2">
          <SkeletonLine className="h-4 w-2/3" />
          <SkeletonLine className="h-3 w-16" />
        </div>
        <SkeletonLine className="h-6 w-20 rounded-full" />
      </div>

      <div className="mb-4 space-y-2 rounded-xl border border-white/[0.05] bg-ink-950/50 p-4">
        <SkeletonLine className="h-3 w-11/12" />
        <SkeletonLine className="h-3 w-3/4" />
        <SkeletonLine className="h-3 w-5/6" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>

      <div className="mb-4 flex gap-2">
        <SkeletonLine className="h-5 w-14 rounded-md" />
        <SkeletonLine className="h-5 w-16 rounded-md" />
      </div>

      <div className="flex gap-2">
        <SkeletonLine className="h-8 w-24 rounded-lg" />
        <SkeletonLine className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export default SkeletonCard;
