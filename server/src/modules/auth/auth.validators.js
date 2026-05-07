const { body } = require('express-validator');

const registerValidators = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidators = [
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];

const passwordChangeValidators = [
  body('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .trim()
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];

const deleteAccountValidators = [
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required to delete account'),
];

module.exports = {
  registerValidators,
  loginValidators,
  passwordChangeValidators,
  deleteAccountValidators,
};
