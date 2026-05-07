import { forwardRef } from 'react';

const VARIANTS = {
  glass: 'glass-card',
  solid:
    'rounded-2xl border bg-white border-zinc-200 shadow-[var(--shadow-card)] dark:bg-zinc-900 dark:border-white/10',
  outline:
    'rounded-2xl border bg-transparent border-zinc-200 dark:border-white/10',
  gradient: 'glass-card gradient-border',
};

const PADDINGS = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = forwardRef(function Card(
  { children, title, subtitle, header, footer, variant = 'glass', padding = 'md', className = '', as: Component = 'div', ...rest },
  ref
) {
  const variantClass = VARIANTS[variant] || VARIANTS.glass;
  const paddingClass = PADDINGS[padding] ?? PADDINGS.md;

  return (
    <Component
      ref={ref}
      className={[variantClass, paddingClass, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {(title || subtitle || header) && (
        <div className="mb-4">
          {header || (
            <>
              {title && <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>}
              {subtitle && <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      {children}
      {footer && <div className="mt-4 pt-4 border-t border-zinc-200/70 dark:border-white/10">{footer}</div>}
    </Component>
  );
});

export default Card;
