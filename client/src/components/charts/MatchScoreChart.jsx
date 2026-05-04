/**
 * MatchScoreChart Component
 * Radar/spider chart visualization using SVG
 * Shows OCEAN scores or skill match percentages
 * Props: scores (object like {openness: 80, conscientiousness: 75, ...}), title
 */

export default function MatchScoreChart({ scores = {}, title = 'Match Score' }) {
  const entries = Object.entries(scores);
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  // Chart dimensions
  const size = 300;
  const center = size / 2;
  const radius = 80;
  const levels = 5;
  const angleSlice = (Math.PI * 2) / entries.length;

  // Convert percentage to coordinates
  const getCoordinates = (index, value) => {
    const angle = angleSlice * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon path for data
  const dataPoints = entries
    .map((entry, index) => getCoordinates(index, entry[1]))
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  // Generate axis lines and labels
  const axes = entries.map((entry, index) => {
    const endPoint = getCoordinates(index, 100);
    const labelPoint = getCoordinates(index, 110);

    return (
      <g key={`axis-${index}`}>
        {/* Axis line */}
        <line
          x1={center}
          y1={center}
          x2={endPoint.x}
          y2={endPoint.y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        {/* Label */}
        <text
          x={labelPoint.x}
          y={labelPoint.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-medium fill-gray-700"
        >
          {entry[0]}
        </text>
      </g>
    );
  });

  // Generate concentric circles (levels)
  const levelCircles = Array.from({ length: levels }).map((_, i) => {
    const levelRadius = ((i + 1) / levels) * radius;
    return (
      <circle
        key={`level-${i}`}
        cx={center}
        cy={center}
        r={levelRadius}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="1"
      />
    );
  });

  // Level labels (20%, 40%, etc.)
  const levelLabels = Array.from({ length: levels }).map((_, i) => {
    const levelValue = ((i + 1) / levels) * 100;
    const labelRadius = ((i + 1) / levels) * radius;
    return (
      <text
        key={`level-label-${i}`}
        x={center + 5}
        y={center - labelRadius}
        className="text-xs fill-gray-400"
      >
        {Math.round(levelValue)}%
      </text>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <svg width={size} height={size} className="drop-shadow-sm">
        {/* Background */}
        <rect width={size} height={size} fill="white" />

        {/* Level circles */}
        {levelCircles}

        {/* Level labels */}
        {levelLabels}

        {/* Axis lines and labels */}
        {axes}

        {/* Data polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Data points */}
        {entries.map((entry, index) => {
          const point = getCoordinates(index, entry[1]);
          return (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        {entries.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-700">
              {entry[0]}: <span className="font-semibold">{Math.round(entry[1])}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
