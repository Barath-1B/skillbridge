const { body } = require('express-validator');

const updateProfileValidators = [
  body('experience')
    .optional()
    .trim()
    .isIn(['student', '0-1yr', '1-3yr', '3+yr'])
    .withMessage('Invalid experience level'),
  body('skillIds')
    .optional()
    .isArray()
    .withMessage('skillIds must be an array'),
  body('certifications')
    .optional()
    .isArray()
    .withMessage('certifications must be an array'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('interests must be an array'),
];

const oceanValidators = [
  body('answers')
    .isArray({ min: 12, max: 12 })
    .withMessage('Must provide exactly 12 answers'),
  body('answers.*.questionId')
    .isInt({ min: 1, max: 12 })
    .withMessage('Invalid questionId'),
  body('answers.*.answer')
    .isIn(['A', 'B', 'C', 'D'])
    .withMessage('Answer must be A, B, C, or D'),
];

module.exports = {
  updateProfileValidators,
  oceanValidators,
};
