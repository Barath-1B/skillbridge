import { Switch as HUISwitch } from '@headlessui/react';

export default function Switch({ checked, onChange, label, description, id, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      {(label || description) && (
        <div className="min-w-0">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
          )}
        </div>
      )}
      <HUISwitch
        id={id}
        checked={!!checked}
        onChange={onChange}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900',
          checked
            ? 'bg-teal-600'
            : 'bg-zinc-300 dark:bg-white/10',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition mt-0.5',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </HUISwitch>
    </div>
  );
}
