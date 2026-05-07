import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export function DropdownItem({ icon, children, onClick, danger = false, as = 'button', href, ...rest }) {
  return (
    <Menu.Item>
      {({ active }) => {
        const Component = as;
        const baseProps = {
          className: [
            'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition text-left',
            active ? 'bg-zinc-100 dark:bg-white/5' : '',
            danger ? 'text-red-600 dark:text-red-400' : 'text-zinc-700 dark:text-zinc-200',
          ]
            .filter(Boolean)
            .join(' '),
        };
        if (Component === 'button') {
          return (
            <button type="button" onClick={onClick} {...baseProps} {...rest}>
              {icon}
              <span className="flex-1">{children}</span>
            </button>
          );
        }
        return (
          <Component href={href} onClick={onClick} {...baseProps} {...rest}>
            {icon}
            <span className="flex-1">{children}</span>
          </Component>
        );
      }}
    </Menu.Item>
  );
}

export default function Dropdown({ button, children, align = 'right', className = '' }) {
  const alignClass = align === 'left' ? 'left-0' : 'right-0';
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button as={Fragment}>{button}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 translate-y-1 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className={[
            'absolute mt-2 w-56 origin-top-right z-50',
            alignClass,
            'rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200 dark:bg-zinc-900/95 dark:border-white/10',
            'shadow-2xl shadow-zinc-900/10 p-1.5 focus:outline-none',
          ].join(' ')}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
