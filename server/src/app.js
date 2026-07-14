const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const { globalLimiter } = require('./middleware/rate-limit.middleware');
const errorHandler = require('./middleware/error.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const profileRoutes = require('./modules/profile/profile.routes');
const analyzerRoutes = require('./modules/analyzer/analyzer.routes');
const careersRoutes = require('./modules/careers/careers.routes');
const roadmapRoutes = require('./modules/roadmap/roadmap.routes');
const adminRoutes = require('./modules/admin/routes');
const retakeTestsRoutes = require('./modules/retake-tests/retake-tests.routes');

// The Express app without env validation, DB connection, or listen() —
// index.js bootstraps those; tests import this app directly via supertest.
const app = express();

// Render (and most PaaS) terminate TLS at a reverse proxy. Without this,
// express-rate-limit rejects the X-Forwarded-For header and keys every
// request to the proxy's IP — one shared rate bucket for all users.
app.set('trust proxy', 1);

// Security middleware
app.use(helmet()); // Set security HTTP headers
app.use(compression()); // Compress JSON responses
app.use(globalLimiter);

app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/analyze', analyzerRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/retake-tests', retakeTestsRoutes);

// Sentry's error handler captures then forwards to the next handler, so it
// must sit between the routes and the app's own errorHandler.
if (process.env.SENTRY_DSN) {
  require('@sentry/node').setupExpressErrorHandler(app);
}

app.use(errorHandler);

module.exports = app;
