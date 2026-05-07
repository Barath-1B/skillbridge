const SIZES = {
  xs: 'w-3 h-3 border-2',
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

const COLORS = {
  blue: 'border-teal-600',
  white: 'border-white',
  zinc: 'border-zinc-500',
};

export default function Spinner({ size = 'md', color = 'blue', className = '' }) {
  const sizeClass = SIZES[size] || SIZES.md;
  const colorClass = COLORS[color] || COLORS.blue;

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`${sizeClass} ${colorClass} border-t-transparent rounded-full animate-spin inline-block ${className}`.trim()}
    />
  );
}
