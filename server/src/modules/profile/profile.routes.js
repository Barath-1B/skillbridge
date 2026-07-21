const express = require('express');
const profileController = require('./profile.controller');
const {
  updateProfileValidators,
  oceanValidators,
  mbtiValidators,
  updateAccountValidators,
  updateSettingsValidators,
} = require('./profile.validators');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');

const router = express.Router();

router.get('/', authenticate, profileController.getProfile);
router.put('/', authenticate, updateProfileValidators, validate, profileController.updateProfile);
router.put('/account', authenticate, updateAccountValidators, validate, profileController.updateAccount);
router.put('/settings', authenticate, updateSettingsValidators, validate, profileController.updateSettings);
router.get('/skills', profileController.getSkills);
router.get('/ocean/questions', profileController.getOceanQuestions);
router.post('/ocean', authenticate, oceanValidators, validate, profileController.submitOcean);
router.get('/mbti/questions', profileController.getMbtiQuestions);
router.post('/mbti', authenticate, mbtiValidators, validate, profileController.submitMbti);

module.exports = router;
