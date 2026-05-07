import { Link } from 'react-router-dom';

export default function Logo({ to = '/', className = '', showWordmark = true, size = 'md' }) {
  const dot = size === 'lg' ? 'w-9 h-9' : 'w-8 h-8';
  const text = size === 'lg' ? 'text-xl' : 'text-lg';
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2.5 group ${className}`}
      aria-label="SkillBridge home"
    >
      <span
        className={`${dot} rounded-xl bg-teal-600 grid place-items-center text-white font-bold shadow-[var(--shadow-glow)] group-hover:brightness-110 transition`}
      >
        S
      </span>
      {showWordmark && (
        <span className={`${text} font-bold tracking-tight font-[var(--font-display)] text-zinc-900 dark:text-zinc-50`}>
          Skill<span className="gradient-text">Bridge</span>
        </span>
      )}
    </Link>
  );
}
