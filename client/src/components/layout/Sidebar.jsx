/**
 * Sidebar Component
 * Navigation sidebar for dashboard and admin pages
 * Props: items (array of {label, path, icon}), activeItem (current path)
 */

import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ items = [] }) {
  const location = useLocation();
  const activeItem = location.pathname;

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <nav className="p-6 space-y-2">
        {items.map((item) => {
          const isActive = activeItem === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon && (
                <span className="text-lg">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Optional sidebar footer */}
      <div className="absolute bottom-0 left-0 right-0 w-64 px-6 py-4 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 text-center">
          SkillBridge v1.0
        </p>
      </div>
    </aside>
  );
}
