export default function Spinner({ size = 'md', color = 'blue' }) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size] || 'w-8 h-8';

  const colorClass = {
    blue: 'border-blue-500',
    white: 'border-white',
  }[color] || 'border-blue-500';

  return (
    <div className={`${sizeClass} border-4 ${colorClass} border-t-transparent rounded-full animate-spin`} />
  );
}
