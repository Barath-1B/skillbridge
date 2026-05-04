export default function ProgressBar({ progress = 0, showLabel = true, className = '' }) {
  const clamped = Math.min(Math.max(progress, 0), 100);
  return (
    <div className={`w-full ${className}`.trim()}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && <p className="text-sm text-gray-600 mt-1">{clamped.toFixed(0)}%</p>}
    </div>
  );
}
