const rateLimit = require('express-rate-limit');

const isDev = process.env.NODE_ENV === 'development';
const WINDOW_15_MIN = 15 * 60 * 1000;

// Global limiter: 400 requests per 15 minutes per IP. Runs before auth, so
// it can only ever be IP-keyed. (The SPA fires several API calls per page
// view; 100 was exhausted by one active user.)
const globalLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: 400,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for credential endpoints (register/login).
const authLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: isDev ? 1000 : 10,
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Looser than authLimiter: legitimate multi-tab sessions refresh often.
const refreshLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: isDev ? 1000 : 30,
  message: 'Too many refresh attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Per-user limiter for compute-heavy authenticated routes. Must be placed
// AFTER authenticate so req.user is set — keying by userId stops one user
// behind a shared IP (campus/office NAT) from exhausting everyone's quota.
const userLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: isDev ? 1000 : 200,
  message: 'Too many requests, please slow down',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.userId?.toString() || req.ip,
  // The req.ip fallback is unreachable in practice (authenticate runs first);
  // silence the v7.5 IPv6-fallback validation for it.
  validate: { keyGeneratorIpFallback: false },
});

module.exports = {
  globalLimiter,
  authLimiter,
  refreshLimiter,
  userLimiter,
};
