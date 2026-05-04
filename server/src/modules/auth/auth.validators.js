const { body } = require('express-validator');

const registerValidators = [
  body('name')
    .trim()
    .escape() // Prevent XSS
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .escape() // Prevent XSS
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
    .escape() // Prevent XSS
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];

module.exports = {
  registerValidators,
  loginValidators,
};
