const User = require('../../models/user.model');
const Skill = require('../../models/skill.model');
const ApiError = require('../../utils/ApiError');
const oceanQuestions = require('../../constants/ocean-questions');
const mbtiQuestions = require('../../constants/mbti-questions');
const { computeOceanScores, computeMbtiResult } = require('../../utils/personality-scoring');

const retakeOceanTest = async (userId, answers) => {
  const oceanScore = computeOceanScores(oceanQuestions, answers);

  const user = await User.findByIdAndUpdate(
    userId,
    { oceanScore, lastOceanTestDate: new Date() },
    { new: true }
  )
    .populate('currentSkills', 'name category tags')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user.toObject({ versionKey: false });
};

const retakeMbtiTest = async (userId, answers) => {
  const { mbtiType, mbtiScores } = computeMbtiResult(mbtiQuestions, answers);

  const user = await User.findByIdAndUpdate(
    userId,
    { mbtiType, mbtiScores, lastMbtiTestDate: new Date() },
    { new: true }
  )
    .populate('currentSkills', 'name category tags')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user.toObject({ versionKey: false });
};

const retakeSkillsTest = async (userId, skillIds) => {
  // Validate that all skill IDs exist
  const skills = await Skill.find({ _id: { $in: skillIds } });
  if (skills.length !== skillIds.length) {
    throw new ApiError(400, 'One or more skill IDs do not exist');
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { currentSkills: skillIds, lastSkillsTestDate: new Date() },
    { new: true }
  )
    .populate('currentSkills', 'name category tags')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user.toObject({ versionKey: false });
};

const getTestHistory = async (userId) => {
  const user = await User.findById(userId)
    .select('lastOceanTestDate lastSkillsTestDate lastMbtiTestDate createdAt');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return {
    profileCreatedAt: user.createdAt,
    lastOceanTestDate: user.lastOceanTestDate || user.createdAt,
    lastSkillsTestDate: user.lastSkillsTestDate || user.createdAt,
    // MBTI is optional — null means "never taken", not profile creation.
    lastMbtiTestDate: user.lastMbtiTestDate || null,
  };
};

const resetAllOnboarding = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      experience: null,
      currentSkills: [],
      certifications: [],
      interests: [],
      oceanScore: {},
      lastOceanTestDate: null,
      lastSkillsTestDate: null,
      mbtiType: null,
      mbtiScores: {},
      lastMbtiTestDate: null,
    },
    { new: true }
  )
    .populate('currentSkills', 'name category tags')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user.toObject({ versionKey: false });
};

module.exports = {
  retakeOceanTest,
  retakeMbtiTest,
  retakeSkillsTest,
  getTestHistory,
  resetAllOnboarding,
};
