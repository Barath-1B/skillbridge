const express = require('express');
const profileController = require('./profile.controller');
const { updateProfileValidators, oceanValidators } = require('./profile.validators');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');

const router = express.Router();

router.get('/', authenticate, profileController.getProfile);
router.put('/', authenticate, updateProfileValidators, validate, profileController.updateProfile);
router.get('/skills', profileController.getSkills);
router.get('/ocean/questions', profileController.getOceanQuestions);
router.post('/ocean', authenticate, oceanValidators, validate, profileController.submitOcean);

module.exports = router;
