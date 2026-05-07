import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Dropdown, { DropdownItem } from '../common/Dropdown';
import { THEMES } from '../../constants/theme';

const MENU_ITEMS = [
  { id: THEMES.LIGHT, label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { id: THEMES.DARK, label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { id: THEMES.SYSTEM, label: 'System', icon: <Monitor className="w-4 h-4" /> },
];

const TRIGGER_CLASS =
  'p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500';

export default function ThemeToggle({ variant = 'menu' }) {
  const { theme, resolved, setTheme, toggle } = useTheme();
  const isDark = resolved === THEMES.DARK;

  if (variant === 'simple') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={TRIGGER_CLASS}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <Dropdown
      align="right"
      button={
        <button type="button" aria-label="Theme" className={TRIGGER_CLASS}>
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      }
    >
      {MENU_ITEMS.map((item) => (
        <DropdownItem
          key={item.id}
          icon={item.icon}
          onClick={() => setTheme(item.id)}
        >
          {item.label}{theme === item.id ? ' ✓' : ''}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
