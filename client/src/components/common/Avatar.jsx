import { useState } from 'react';

const SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-3xl',
};

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ name = '', src, size = 'md', className = '', ring = false }) {
  const sizeClass = SIZES[size] || SIZES.md;
  const ringClass = ring ? 'ring-2 ring-white dark:ring-zinc-900' : '';
  const base = `inline-flex items-center justify-center rounded-full overflow-hidden font-semibold ${sizeClass} ${ringClass}`;

  const [failed, setFailed] = useState(false);
  // Reset the error state when the image source changes (render-time
  // adjustment instead of an effect, per React docs).
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setFailed(false);
  }

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`${base} object-cover bg-zinc-200 dark:bg-white/10 ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      className={`${base} text-white bg-teal-600 ${className}`}
      aria-label={name || 'Avatar'}
    >
      {getInitials(name)}
    </span>
  );
}
