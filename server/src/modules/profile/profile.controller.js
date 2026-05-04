const profileService = require('./profile.service');
const ApiResponse = require('../../utils/ApiResponse');

const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.userId);
    ApiResponse.ok(res, 'Profile retrieved', profile);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { experience, skillIds, certifications, interests } = req.body;
    const updatedProfile = await profileService.updateProfile(req.user.userId, {
      experience,
      skillIds,
      certifications,
      interests,
    });
    ApiResponse.ok(res, 'Profile updated', updatedProfile);
  } catch (err) {
    next(err);
  }
};

const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const skills = await profileService.getSkills(category);
    ApiResponse.ok(res, 'Skills retrieved', skills);
  } catch (err) {
    next(err);
  }
};

const getOceanQuestions = async (req, res, next) => {
  try {
    const questions = await profileService.getOceanQuestions();
    ApiResponse.ok(res, 'OCEAN questions retrieved', questions);
  } catch (err) {
    next(err);
  }
};

const submitOcean = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const updatedProfile = await profileService.computeAndSaveOcean(
      req.user.userId,
      answers
    );
    ApiResponse.ok(res, 'OCEAN scores computed and saved', updatedProfile);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getSkills,
  getOceanQuestions,
  submitOcean,
};
