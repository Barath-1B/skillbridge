export default function EmptyState({ icon, title, description, action, className = '' }) {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-teal-500/15 text-teal-600 dark:text-teal-300">
          {icon}
        </div>
      )}
      {title && <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>}
      {description && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
