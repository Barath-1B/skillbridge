require('dotenv').config();
require('./config/sentry'); // no-op unless SENTRY_DSN is set
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const connectDB = require('./config/db');

// Validate required environment variables before starting
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
if (process.env.NODE_ENV === 'production') {
  // CLIENT_URL feeds the CORS origin; without it production silently falls
  // back to localhost and every browser request gets CORS-blocked.
  requiredEnvVars.push('CLIENT_URL');
}
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  logger.fatal({ missingEnvVars }, 'Missing required environment variables');
  process.exit(1);
}

const app = require('./app');

connectDB().catch(err => {
  logger.fatal({ err }, 'Failed to connect to MongoDB');
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server running');
});

const shutdown = async (signal) => {
  logger.info({ signal }, 'Shutting down');
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Crash visibility: log the reason before dying so Render restarts leave a trail.
process.on('unhandledRejection', (err) => {
  logger.fatal({ err }, 'Unhandled promise rejection');
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception');
  process.exit(1);
});
