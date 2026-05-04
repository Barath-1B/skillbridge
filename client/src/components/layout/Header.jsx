/**
 * Header Component
 * Navigation bar with logo, links, and user menu
 * Supports authenticated and guest states
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function Header({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SB</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 hidden sm:inline">
            SkillBridge
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/explorer"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Careers
          </Link>
          <Link
            to="/roadmap"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Roadmap
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            About
          </Link>
        </div>

        {/* User menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:inline">
                  {user.name}
                </span>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 last:rounded-b-lg border-t border-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
