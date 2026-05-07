const { body } = require('express-validator');

const oceanValidators = [
  body('answers')
    .isArray({ min: 1 })
    .withMessage('Answers must be a non-empty array'),
  body('answers.*.questionId')
    .isInt({ min: 1, max: 100 })
    .withMessage('Each answer must have a valid questionId'),
  body('answers.*.answer')
    .isString()
    .isIn(['A', 'B', 'C', 'D'])
    .withMessage('Answer must be A, B, C, or D'),
];

const skillsValidators = [
  body('skillIds')
    .isArray()
    .withMessage('skillIds must be an array'),
  body('skillIds.*')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Each skillId must be a non-empty string'),
];

module.exports = {
  oceanValidators,
  skillsValidators,
};
