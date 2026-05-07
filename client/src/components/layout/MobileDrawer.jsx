import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, Compass, Map, User, Settings, LogOut, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import Avatar from '../common/Avatar';
import ThemeToggle from './ThemeToggle';

const PUBLIC_LINKS = [
  { to: '/', label: 'Home', icon: <Compass className="w-4 h-4" /> },
];

const PRIVATE_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { to: '/analyze', label: 'Career matches', icon: <Compass className="w-4 h-4" /> },
  { to: '/retake-tests', label: 'Retake tests', icon: <Map className="w-4 h-4" /> },
  { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { to: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

export default function MobileDrawer({ open, onClose, user, onLogout }) {
  const location = useLocation();
  const links = user ? PRIVATE_LINKS : PUBLIC_LINKS;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50 md:hidden">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-white/10">
              <Logo size="md" />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {user && (
              <div className="px-4 py-4 border-b border-zinc-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} src={user.avatarUrl} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{user.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex-1 overflow-y-auto p-3">
              <ul className="space-y-1">
                {links.map((link) => {
                  const active = location.pathname === link.to ||
                    (link.to !== '/' && location.pathname.startsWith(link.to));
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className={[
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition',
                          active
                            ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5',
                        ].join(' ')}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                {user?.role === 'admin' && (
                  <li>
                    <Link
                      to="/admin"
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin panel
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="p-3 border-t border-zinc-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Theme</span>
                <ThemeToggle />
              </div>
              {user ? (
                <button
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/5 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 shadow-[var(--shadow-glow)] transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
