const retakeTestsService = require('./retake-tests.service');
const ApiResponse = require('../../utils/ApiResponse');

const retakeOceanTest = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const updatedProfile = await retakeTestsService.retakeOceanTest(
      req.user.userId,
      answers
    );
    ApiResponse.ok(res, 'OCEAN test retaken and scores updated', updatedProfile);
  } catch (err) {
    next(err);
  }
};

const retakeSkillsTest = async (req, res, next) => {
  try {
    const { skillIds } = req.body;
    const updatedProfile = await retakeTestsService.retakeSkillsTest(
      req.user.userId,
      skillIds
    );
    ApiResponse.ok(res, 'Skills test retaken and updated', updatedProfile);
  } catch (err) {
    next(err);
  }
};

const getTestHistory = async (req, res, next) => {
  try {
    const history = await retakeTestsService.getTestHistory(req.user.userId);
    ApiResponse.ok(res, 'Test history retrieved', history);
  } catch (err) {
    next(err);
  }
};

const resetAllOnboarding = async (req, res, next) => {
  try {
    const updatedProfile = await retakeTestsService.resetAllOnboarding(req.user.userId);
    ApiResponse.ok(res, 'All onboarding data reset', updatedProfile);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  retakeOceanTest,
  retakeSkillsTest,
  getTestHistory,
  resetAllOnboarding,
};
