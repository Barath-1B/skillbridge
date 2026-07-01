const User = require('../../models/user.model');
const Skill = require('../../models/skill.model');
const ApiError = require('../../utils/ApiError');
const oceanQuestions = require('../../constants/ocean-questions');
const mbtiQuestions = require('../../constants/mbti-questions');
const { computeOceanScores, computeMbtiResult } = require('../../utils/personality-scoring');

const POPULATED_SKILL_FIELDS = 'name category tags';

const findUserPopulated = (userId) =>
  User.findById(userId)
    .populate('currentSkills', POPULATED_SKILL_FIELDS)
    .select('-password');

const updateUserPopulated = (userId, update) =>
  User.findByIdAndUpdate(userId, update, { new: true })
    .populate('currentSkills', POPULATED_SKILL_FIELDS)
    .select('-password');

const requireUser = (user) => {
  if (!user) throw new ApiError(404, 'User not found');
  return user.toObject({ versionKey: false });
};

const getProfile = async (userId) => requireUser(await findUserPopulated(userId));

const updateProfile = async (userId, { experience, skillIds, certifications, interests }) => {
  const updateData = {};

  if (experience) {
    updateData.experience = experience;
  }

  if (skillIds && skillIds.length > 0) {
    const skills = await Skill.find({ _id: { $in: skillIds } });
    if (skills.length !== skillIds.length) {
      throw new ApiError(400, 'One or more skill IDs do not exist');
    }
    updateData.currentSkills = skillIds;
  }

  if (certifications) {
    updateData.certifications = certifications;
  }

  if (interests) {
    updateData.interests = interests;
  }

  return requireUser(await updateUserPopulated(userId, updateData));
};

const updateAccount = async (userId, { name, email, avatarUrl }) => {
  const updateData = {};
  if (typeof name === 'string' && name.trim()) updateData.name = name.trim();
  if (typeof email === 'string' && email.trim()) {
    const normalized = email.trim().toLowerCase();
    const conflict = await User.findOne({ email: normalized, _id: { $ne: userId } });
    if (conflict) {
      throw new ApiError(409, 'Email already in use');
    }
    updateData.email = normalized;
  }
  if (typeof avatarUrl === 'string') updateData.avatarUrl = avatarUrl.trim();

  return requireUser(await updateUserPopulated(userId, updateData));
};

const updateSettings = async (userId, { theme, notificationPreferences }) => {
  const set = {};
  if (theme) set.theme = theme;
  if (notificationPreferences && typeof notificationPreferences === 'object') {
    for (const [key, value] of Object.entries(notificationPreferences)) {
      if (typeof value === 'boolean') {
        set[`notificationPreferences.${key}`] = value;
      }
    }
  }

  return requireUser(await updateUserPopulated(userId, { $set: set }));
};

const getSkills = async (category) => {
  const query = {};
  if (category) {
    query.category = category;
  }
  const skills = await Skill.find(query).sort({ name: 1 });
  return skills.map(s => s.toObject({ versionKey: false }));
};

const getOceanQuestions = async () => oceanQuestions;

const computeAndSaveOcean = async (userId, answers) => {
  const oceanScore = computeOceanScores(oceanQuestions, answers);

  return requireUser(
    await updateUserPopulated(userId, { oceanScore, lastOceanTestDate: new Date() })
  );
};

const getMbtiQuestions = async () => mbtiQuestions;

const computeAndSaveMbti = async (userId, answers) => {
  const { mbtiType, mbtiScores } = computeMbtiResult(mbtiQuestions, answers);

  return requireUser(
    await updateUserPopulated(userId, { mbtiType, mbtiScores, lastMbtiTestDate: new Date() })
  );
};

module.exports = {
  getProfile,
  updateProfile,
  updateAccount,
  updateSettings,
  getSkills,
  getOceanQuestions,
  computeAndSaveOcean,
  getMbtiQuestions,
  computeAndSaveMbti,
};
