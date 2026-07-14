const Sentry = require('@sentry/node');

// Error tracking is opt-in: without SENTRY_DSN this module is a no-op and
// the SDK stays dormant. Required before ./app so Express gets instrumented.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 0.1,
  });
}

module.exports = Sentry;
