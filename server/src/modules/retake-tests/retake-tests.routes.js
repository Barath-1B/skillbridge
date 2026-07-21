const express = require('express');
const retakeTestsController = require('./retake-tests.controller');
const { oceanValidators, mbtiValidators, skillsValidators } = require('./retake-tests.validators');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');
const { userLimiter } = require('../../middleware/rate-limit.middleware');

const router = express.Router();

// Retake OCEAN personality test
router.post('/ocean', authenticate, userLimiter, oceanValidators, validate, retakeTestsController.retakeOceanTest);

// Retake MBTI personality test
router.post('/mbti', authenticate, userLimiter, mbtiValidators, validate, retakeTestsController.retakeMbtiTest);

// Retake skills selection test
router.post('/skills', authenticate, userLimiter, skillsValidators, validate, retakeTestsController.retakeSkillsTest);

// Get test history/timeline
router.get('/history', authenticate, retakeTestsController.getTestHistory);

// Reset all onboarding data (start from scratch)
router.post('/reset', authenticate, retakeTestsController.resetAllOnboarding);

module.exports = router;
