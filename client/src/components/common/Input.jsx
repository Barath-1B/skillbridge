import { forwardRef, useId } from 'react';

const Input = forwardRef(function Input(
  { label, type = 'text', error, hint, leftIcon, rightSlot, className = '', id, ...rest },
  ref
) {
  const generatedId = useId();
  const fieldId = id || generatedId;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={fieldId} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={fieldId}
          type={type}
          aria-invalid={Boolean(error) || undefined}
          className={[
            'w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition',
            'bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400',
            'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
            'dark:bg-white/5 dark:border-white/10 dark:text-zinc-100 dark:placeholder:text-zinc-500',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            leftIcon ? 'pl-10' : '',
            rightSlot ? 'pr-10' : '',
            error ? '!border-red-500 focus:!ring-red-500/20' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 flex">{rightSlot}</span>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
