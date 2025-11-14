/**
 * SkeletonCard - Loading state for ToolCard
 * Sprint 1, Track 1: Performance optimizations
 * Voice: Jobs ("deliberate preparation" not spinners)
 */

export default function SkeletonCard() {
  return (
    <div className="h-full bg-black/60 border border-gray-900 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col animate-pulse">
      {/* Thumbnail skeleton - 16:9 aspect ratio */}
      <div className="relative aspect-video w-full bg-gray-800/50">
        {/* Pulsing gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 animate-shimmer" />

        {/* Category badge placeholder */}
        <div className="absolute top-3 left-3 w-24 h-6 bg-gray-700/70 rounded-full" />
      </div>

      {/* Content section skeleton */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Tool Name skeleton */}
        <div className="h-5 bg-gray-800/70 rounded w-3/4" />

        {/* Vendor skeleton */}
        <div className="h-3 bg-gray-800/50 rounded w-1/2" />

        {/* Distinctive Edge skeleton (2 lines) */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-800/50 rounded w-full" />
          <div className="h-4 bg-gray-800/50 rounded w-5/6" />
        </div>

        {/* Trust badges skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-800/50 rounded" />
          <div className="h-6 w-20 bg-gray-800/50 rounded" />
        </div>

        {/* Pricing skeleton */}
        <div className="h-4 bg-gray-800/50 rounded w-1/3" />

        {/* CTA buttons skeleton */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex-1 h-10 bg-gray-800/70 rounded-lg" />
          <div className="w-10 h-10 bg-gray-800/70 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * SkeletonGrid - Shows multiple skeleton cards while loading
 */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
