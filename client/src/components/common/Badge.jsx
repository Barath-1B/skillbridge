export default function Badge({ children, variant = 'primary', className = '' }) {
  const variantClass = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  }[variant] || 'badge-primary';

  return <span className={`${variantClass} ${className}`.trim()}>{children}</span>;
}
