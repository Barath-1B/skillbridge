import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';

// Error tracking is opt-in; the dynamic import keeps Sentry out of the
// bundle's entry chunk entirely when no DSN is configured.
if (import.meta.env.VITE_SENTRY_DSN) {
  import('./sentry');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
