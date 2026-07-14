import * as Sentry from '@sentry/react';

// Loaded dynamically from main.jsx only when VITE_SENTRY_DSN is set, so the
// Sentry SDK never ships in the bundle's critical path when unconfigured.
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
});
