const CareerPath = require('../../models/career-path.model');
const UserProgress = require('../../models/user-progress.model');
const User = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');
const { analyzeCareerPath } = require('../../utils/gap-engine');

const listCareers = async ({ domain, difficulty, demand }) => {
  const query = {};
  if (domain) query.domain = domain;
  if (difficulty) query.difficulty = difficulty;
  if (demand) query.demand = demand;

  const careers = await CareerPath.find(query)
    .select('title domain description difficulty demand estimatedTimeToBridge advantages certifications')
    .sort({ title: 1 });

  return careers.map(c => c.toObject({ versionKey: false }));
};

const getCareerById = async (careerPathId) => {
  const career = await CareerPath.findById(careerPathId)
    .populate('requiredSkills.skillId', 'name category tags');

  if (!career) {
    throw new ApiError(404, 'Career path not found');
  }

  return career.toObject({ versionKey: false });
};

const _buildUserContext = async (userId, careerPathId) => {
  const [user, career] = await Promise.all([
    User.findById(userId).populate('currentSkills', 'name category').select('-password'),
    CareerPath.findById(careerPathId).populate('requiredSkills.skillId', 'name category'),
  ]);

  if (!user) throw new ApiError(404, 'User not found');
  if (!career) throw new ApiError(404, 'Career path not found');

  return { user, career };
};

const analyzeCareer = async (userId, careerPathId) => {
  const { user, career } = await _buildUserContext(userId, careerPathId);

  const userSkillIdSet = new Set(user.currentSkills.map(s => s._id.toString()));

  const requiredSkills = career.requiredSkills
    .filter(rs => rs.skillId)
    .map(rs => ({
      id: rs.skillId._id.toString(),
      name: rs.skillId.name,
      category: rs.skillId.category,
      weight: rs.weight,
      priority: rs.priority,
    }));

  const analysis = analyzeCareerPath(
    userSkillIdSet,
    user.certifications,
    user.oceanScore,
    { domain: career.domain, requiredSkills, requiredCerts: career.certifications }
  );

  return {
    careerPath: career.toObject({ versionKey: false }),
    ...analysis,
  };
};

const saveCareer = async (userId, careerPathId) => {
  const { user, career } = await _buildUserContext(userId, careerPathId);

  // v1: completedSkills = user's current skills that intersect with career's required skills
  const userSkillIdSet = new Set(user.currentSkills.map(s => s._id.toString()));
  const completedSkills = career.requiredSkills
    .filter(rs => rs.skillId && userSkillIdSet.has(rs.skillId._id.toString()))
    .map(rs => rs.skillId._id);

  const percentComplete = career.requiredSkills.length > 0
    ? Math.round((completedSkills.length / career.requiredSkills.length) * 100)
    : 0;

  const progress = await UserProgress.findOneAndUpdate(
    { userId, careerPathId },
    { completedSkills, percentComplete },
    { upsert: true, new: true, runValidators: true }
  ).populate('careerPathId', 'title domain difficulty demand estimatedTimeToBridge');

  return progress.toObject({ versionKey: false });
};

const unsaveCareer = async (userId, careerPathId) => {
  const result = await UserProgress.findOneAndDelete({ userId, careerPathId });
  if (!result) {
    throw new ApiError(404, 'Saved career not found');
  }
};

const getSavedCareers = async (userId) => {
  const saved = await UserProgress.find({ userId })
    .populate(
      'careerPathId',
      'title domain description difficulty demand estimatedTimeToBridge advantages phases resources certifications'
    )
    .sort({ updatedAt: -1 });

  return saved.map(s => s.toObject({ versionKey: false }));
};

module.exports = {
  listCareers,
  getCareerById,
  analyzeCareer,
  saveCareer,
  unsaveCareer,
  getSavedCareers,
};
