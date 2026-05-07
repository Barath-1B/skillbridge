const User = require('../../models/user.model');
const Skill = require('../../models/skill.model');
const ApiError = require('../../utils/ApiError');
const oceanQuestions = require('../../constants/ocean-questions');

const retakeOceanTest = async (userId, answers) => {
  // Validate all question IDs exist
  const validQuestionIds = oceanQuestions.map(q => q.id);
  const answerQuestionIds = answers.map(a => a.questionId);

  if (!answerQuestionIds.every(id => validQuestionIds.includes(id))) {
    throw new ApiError(400, 'One or more question IDs are invalid');
  }

  // Build a map of questionId -> option for lookup
  const questionMap = {};
  oceanQuestions.forEach(q => {
    questionMap[q.id] = q.options;
  });

  // Compute trait scores
  const traitScores = { O: [], C: [], E: [], A: [], N: [] };

  answers.forEach(({ questionId, answer }) => {
    const options = questionMap[questionId];
    const selectedOption = options.find(opt => opt.value === answer);

    if (!selectedOption) {
      throw new ApiError(400, `Invalid answer for question ${questionId}`);
    }

    traitScores[selectedOption.trait].push(selectedOption.score);
  });

  // Average scores for each trait
  const oceanScore = {};
  Object.keys(traitScores).forEach(trait => {
    const scores = traitScores[trait];
    const average = scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 50;
    oceanScore[trait] = Math.round(average);
  });

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
    .select('lastOceanTestDate lastSkillsTestDate createdAt');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return {
    profileCreatedAt: user.createdAt,
    lastOceanTestDate: user.lastOceanTestDate || user.createdAt,
    lastSkillsTestDate: user.lastSkillsTestDate || user.createdAt,
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
  retakeSkillsTest,
  getTestHistory,
  resetAllOnboarding,
};
