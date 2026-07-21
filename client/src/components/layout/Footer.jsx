import { Link } from 'react-router-dom';
import Logo from './Logo';

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.92.43.372.815 1.103.815 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);



export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-zinc-200/70 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2">
            <Logo size="md" />
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
              Find your gap. Bridge it. A career advisor that meets you where you are.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                  Match analyzer
                </Link>
              </li>
              <li>
                <Link to="/retake-tests" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                  Retake tests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profile" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            © {year} SkillBridge.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Find your gap. <span className="gradient-text font-semibold">Bridge it.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
