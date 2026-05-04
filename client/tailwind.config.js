/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Custom color palette aligned with SkillBridge branding
      colors: {
        // Brand primary: blue
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main brand color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Accent colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      // Custom spacing
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      // Custom font sizes for hierarchy
      fontSize: {
        'display-lg': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        'display-md': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'heading-lg': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      },
      // Custom shadows for cards and depth
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'elevation-2': '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      // Custom transitions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [],
};
