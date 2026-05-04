const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('./auth.controller');
const { registerValidators, loginValidators } = require('./auth.validators');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');

const router = express.Router();

// Strict rate limiter for auth endpoints: 10 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, registerValidators, validate, authController.register);
router.post('/login', authLimiter, loginValidators, validate, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
