const { body } = require('express-validator');

// Exact count: partial answers leave traits under-sampled and skew scoring.
const oceanValidators = [
  body('answers')
    .isArray({ min: 32, max: 32 })
    .withMessage('Must provide exactly 32 answers'),
  body('answers.*.questionId')
    .isInt({ min: 1, max: 32 })
    .withMessage('Each answer must have a valid questionId'),
  body('answers.*.answer')
    .isString()
    .isIn(['A', 'B', 'C', 'D'])
    .withMessage('Answer must be A, B, C, or D'),
];

// Strict count: partial MBTI answers would skew the count-based typing.
const mbtiValidators = [
  body('answers')
    .isArray({ min: 32, max: 32 })
    .withMessage('Must provide exactly 32 answers'),
  body('answers.*.questionId')
    .isInt({ min: 1, max: 32 })
    .withMessage('Each answer must have a valid questionId'),
  body('answers.*.answer')
    .isIn(['A', 'B'])
    .withMessage('Answer must be A or B'),
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
  mbtiValidators,
  skillsValidators,
};
