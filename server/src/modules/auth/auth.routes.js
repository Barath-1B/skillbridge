const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('./auth.controller');
const {
  registerValidators,
  loginValidators,
  passwordChangeValidators,
  deleteAccountValidators,
} = require('./auth.validators');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, registerValidators, validate, authController.register);
router.post('/login', authLimiter, loginValidators, validate, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);
router.put('/password', authenticate, passwordChangeValidators, validate, authController.changePassword);
router.delete('/account', authenticate, deleteAccountValidators, validate, authController.deleteAccount);

module.exports = router;
