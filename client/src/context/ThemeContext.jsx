import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { THEMES, THEME_VALUES } from '../constants/theme';

const STORAGE_KEY = 'skillbridge-theme';

const ThemeContext = createContext(null);

function applyResolved(theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = theme === THEMES.SYSTEM ? (prefersDark ? THEMES.DARK : THEMES.LIGHT) : theme;
  document.documentElement.classList.toggle('dark', resolved === THEMES.DARK);
  return resolved;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return THEMES.SYSTEM;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return THEME_VALUES.includes(stored) ? stored : THEMES.SYSTEM;
  });

  const [resolved, setResolved] = useState(() =>
    typeof window === 'undefined' ? THEMES.LIGHT : applyResolved(theme)
  );

  // Skip the localStorage write on initial mount — the value we'd write is the
  // value we just read.
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setResolved(applyResolved(theme));
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable (private mode, quota, etc.)
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== THEMES.SYSTEM) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setResolved(applyResolved(THEMES.SYSTEM));
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (!THEME_VALUES.includes(next)) return;
    setThemeState((cur) => (cur === next ? cur : next));
  }, []);

  const toggle = useCallback(() => {
    setThemeState((cur) => (cur === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider by design
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
