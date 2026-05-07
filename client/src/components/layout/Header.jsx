import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu as MenuIcon, LayoutDashboard, User, Settings, LogOut, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import MobileDrawer from './MobileDrawer';
import Avatar from '../common/Avatar';
import Dropdown, { DropdownItem } from '../common/Dropdown';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', auth: true },
  { to: '/analyze', label: 'Matches', auth: true },
  { to: '/retake-tests', label: 'Tests', auth: true },
];

const PUBLIC_NAV = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Sign in' },
];

export default function Header({ user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 4;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const navLinks = user ? NAV : PUBLIC_NAV;

  return (
    <>
      <header
        className={[
          'sticky top-0 z-40 transition-all',
          scrolled
            ? 'bg-white/75 dark:bg-zinc-950/75 backdrop-blur-xl border-b border-zinc-200/70 dark:border-white/10'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />

            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  link.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.to);
                return (
                  <li key={link.to} className="relative">
                    <Link
                      to={link.to}
                      className={[
                        'relative px-3 py-2 text-sm font-medium transition rounded-lg',
                        active
                          ? 'text-zinc-900 dark:text-zinc-50'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
                      ].join(' ')}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active-underline"
                          className="absolute left-2 right-2 -bottom-0.5 h-[2px] rounded-full bg-teal-600"
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden md:flex items-center gap-1.5">
              <ThemeToggle />
            </div>

            {user ? (
              <Dropdown
                align="right"
                button={
                  <button
                    type="button"
                    aria-label="User menu"
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <Avatar name={user.name} src={user.avatarUrl} size="sm" />
                    <span className="hidden sm:inline text-sm font-medium text-zinc-800 dark:text-zinc-200 max-w-[120px] truncate">
                      {user.name?.split(' ')[0]}
                    </span>
                  </button>
                }
              >
                <div className="px-3 py-2 border-b border-zinc-200 dark:border-white/10 mb-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{user.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                </div>
                <DropdownItem icon={<LayoutDashboard className="w-4 h-4" />} as={Link} to="/dashboard">
                  Dashboard
                </DropdownItem>
                <DropdownItem icon={<User className="w-4 h-4" />} as={Link} to="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem icon={<Settings className="w-4 h-4" />} as={Link} to="/settings">
                  Settings
                </DropdownItem>
                {user.role === 'admin' && (
                  <DropdownItem icon={<ShieldCheck className="w-4 h-4" />} as={Link} to="/admin">
                    Admin panel
                  </DropdownItem>
                )}
                <div className="my-1 border-t border-zinc-200 dark:border-white/10" />
                <DropdownItem icon={<LogOut className="w-4 h-4" />} onClick={onLogout} danger>
                  Log out
                </DropdownItem>
              </Dropdown>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-2 text-sm font-semibold text-white rounded-lg bg-teal-600 shadow-[var(--shadow-glow)] hover:brightness-110 transition"
                >
                  Get started
                </Link>
              </div>
            )}

            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        onLogout={onLogout}
      />
    </>
  );
}
