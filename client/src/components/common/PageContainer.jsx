export default function PageContainer({ children, className = '', size = 'default' }) {
  const sizeClass = size === 'narrow' ? 'max-w-3xl' : size === 'wide' ? 'max-w-7xl' : 'max-w-6xl';
  return (
    <div className={`${sizeClass} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 ${className}`}>
      {children}
    </div>
  );
}
