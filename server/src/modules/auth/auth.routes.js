const express = require('express');
const { authLimiter, refreshLimiter } = require('../../middleware/rate-limit.middleware');
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

router.post('/register', authLimiter, registerValidators, validate, authController.register);
router.post('/login', authLimiter, loginValidators, validate, authController.login);
router.post('/refresh', refreshLimiter, authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);
router.put('/password', authenticate, passwordChangeValidators, validate, authController.changePassword);
router.delete('/account', authenticate, deleteAccountValidators, validate, authController.deleteAccount);

module.exports = router;
