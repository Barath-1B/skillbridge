import { AlertCircle } from 'lucide-react';

export default function FormError({ message, className = '' }) {
  if (!message) return null;
  return (
    <p className={`flex items-start gap-2 text-sm text-red-600 dark:text-red-400 ${className}`.trim()}>
      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}
