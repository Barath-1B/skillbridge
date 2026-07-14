const pino = require('pino');

// JSON lines in production (Render log search ingests them directly);
// human-readable pretty output only during local development.
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

module.exports = logger;
