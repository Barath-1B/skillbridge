const VARIANTS = {
  primary: 'bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  neutral: 'bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200',
  gradient: 'text-white bg-teal-600',
};

export default function Badge({ children, variant = 'primary', className = '', leftIcon }) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${variantClass} ${className}`.trim()}
    >
      {leftIcon}
      {children}
    </span>
  );
}
