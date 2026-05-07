export default function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return (
    <div
      className={[
        rounded,
        'relative overflow-hidden bg-zinc-200/70 dark:bg-white/5',
        className,
      ].join(' ')}
    >
      <span className="absolute inset-0 shimmer" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          rounded="rounded-md"
          className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}
