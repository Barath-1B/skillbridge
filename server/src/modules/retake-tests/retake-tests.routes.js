const express = require('express');
const retakeTestsController = require('./retake-tests.controller');
const { oceanValidators, skillsValidators } = require('./retake-tests.validators');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');

const router = express.Router();

// Retake OCEAN personality test
router.post('/ocean', authenticate, oceanValidators, validate, retakeTestsController.retakeOceanTest);

// Retake skills selection test
router.post('/skills', authenticate, skillsValidators, validate, retakeTestsController.retakeSkillsTest);

// Get test history/timeline
router.get('/history', authenticate, retakeTestsController.getTestHistory);

// Reset all onboarding data (start from scratch)
router.post('/reset', authenticate, retakeTestsController.resetAllOnboarding);

module.exports = router;
