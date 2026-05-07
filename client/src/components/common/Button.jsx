import { forwardRef } from 'react';
import Spinner from './Spinner';

const VARIANTS = {
  primary:
    'text-white bg-teal-600 hover:bg-teal-700 shadow-sm hover:shadow-md',
  secondary:
    'bg-white border border-zinc-200 text-slate-900 hover:bg-zinc-50 dark:bg-white/5 dark:border-white/10 dark:text-zinc-100 dark:hover:bg-white/10',
  ghost:
    'bg-transparent text-slate-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5',
  destructive:
    'text-white bg-red-500 hover:bg-red-600',
  // legacy aliases — kept so existing call sites still work
  danger: 'text-white bg-red-500 hover:bg-red-600',
  success: 'text-white bg-emerald-600 hover:bg-emerald-700',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-5 py-3 text-base rounded-xl',
  xl: 'px-6 py-3.5 text-base rounded-2xl',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    disabled = false,
    loading = false,
    className = '',
    type = 'button',
    leftIcon,
    rightIcon,
    fullWidth = false,
    ...rest
  },
  ref
) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold transition active:scale-[0.98]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClass,
        sizeClass,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading && <Spinner size="sm" color={variant === 'primary' ? 'white' : 'blue'} />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

export default Button;
