require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const { globalLimiter } = require('./middleware/rate-limit.middleware');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const profileRoutes = require('./modules/profile/profile.routes');
const analyzerRoutes = require('./modules/analyzer/analyzer.routes');
const careersRoutes = require('./modules/careers/careers.routes');
const roadmapRoutes = require('./modules/roadmap/roadmap.routes');
const adminRoutes = require('./modules/admin/routes');
const retakeTestsRoutes = require('./modules/retake-tests/retake-tests.routes');

// Validate required environment variables before starting
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
if (process.env.NODE_ENV === 'production') {
  // CLIENT_URL feeds the CORS origin; without it production silently falls
  // back to localhost and every browser request gets CORS-blocked.
  requiredEnvVars.push('CLIENT_URL');
}
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const app = express();

// Render (and most PaaS) terminate TLS at a reverse proxy. Without this,
// express-rate-limit rejects the X-Forwarded-For header and keys every
// request to the proxy's IP — one shared rate bucket for all users.
app.set('trust proxy', 1);

// Security middleware
app.use(helmet()); // Set security HTTP headers
app.use(compression()); // Compress JSON responses

app.use(globalLimiter);

connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received — shutting down`);
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
