export default function ProgressBar({ progress = 0, showLabel = true, gradient = true, className = '', size = 'md' }) {
  const clamped = Math.min(Math.max(progress, 0), 100);
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';
  // `gradient` prop is kept for backwards-compat with existing call sites,
  // but the duo-tone system uses a solid teal fill regardless.
  void gradient;
  const fill = 'bg-teal-600';

  return (
    <div className={`w-full ${className}`.trim()}>
      <div className={`w-full ${heightClass} rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden`}>
        <div
          className={`${heightClass} ${fill} rounded-full transition-[width] duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 tabular-nums">{clamped.toFixed(0)}%</p>
      )}
    </div>
  );
}
