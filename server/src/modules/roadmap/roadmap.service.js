const CareerPath = require('../../models/career-path.model');
const UserProgress = require('../../models/user-progress.model');
const User = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');
const { analyzeCareerPath } = require('../../utils/gap-engine');

const _getContext = async (userId, careerPathId) => {
  const [user, career] = await Promise.all([
    User.findById(userId).populate('currentSkills', 'name category').select('-password'),
    CareerPath.findById(careerPathId).populate('requiredSkills.skillId', 'name category tags'),
  ]);

  if (!user) throw new ApiError(404, 'User not found');
  if (!career) throw new ApiError(404, 'Career path not found');

  return { user, career };
};

const _computeAnalysis = (user, career) => {
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

  return analyzeCareerPath(
    userSkillIdSet,
    user.certifications,
    user.oceanScore,
    { domain: career.domain, requiredSkills, requiredCerts: career.certifications }
  );
};

// Annotate each phase's skill strings with have/missing status.
// Uses substring matching so "SQL basics" matches user skill "SQL".
const _annotatePhases = (phases, userSkillNames) => {
  const userLower = new Set(userSkillNames.map(n => n.toLowerCase()));

  return phases.map(phase => ({
    phase: phase.phase,
    title: phase.title,
    milestoneMonths: phase.milestoneMonths,
    skills: phase.skills.map(skillName => {
      const lower = skillName.toLowerCase();
      const have =
        userLower.has(lower) ||
        [...userLower].some(s => lower.includes(s) || s.includes(lower));
      return { name: skillName, status: have ? 'have' : 'missing' };
    }),
  }));
};

const getCareerBrief = async (userId, careerPathId) => {
  const { user, career } = await _getContext(userId, careerPathId);

  const analysis = _computeAnalysis(user, career);
  const annotatedPhases = _annotatePhases(
    career.phases,
    user.currentSkills.map(s => s.name)
  );

  const progress = await UserProgress.findOne({ userId, careerPathId });

  return {
    career: {
      _id: career._id,
      title: career.title,
      domain: career.domain,
      description: career.description,
      difficulty: career.difficulty,
      demand: career.demand,
      estimatedTimeToBridge: career.estimatedTimeToBridge,
      advantages: career.advantages,
      resources: career.resources,
      certifications: career.certifications,
    },
    analysis,
    roadmap: annotatedPhases,
    progress: {
      isSaved: !!progress,
      percentComplete: progress ? progress.percentComplete : 0,
      completedSkillCount: progress ? progress.completedSkills.length : 0,
      totalRequiredSkillCount: career.requiredSkills.length,
    },
  };
};

const getMyRoadmaps = async (userId) => {
  const user = await User.findById(userId)
    .populate('currentSkills', 'name category')
    .select('-password');

  if (!user) throw new ApiError(404, 'User not found');

  const savedProgress = await UserProgress.find({ userId })
    .populate({
      path: 'careerPathId',
      populate: { path: 'requiredSkills.skillId', select: 'name category' },
    })
    .sort({ updatedAt: -1 });

  return savedProgress
    .filter(p => p.careerPathId)
    .map(p => {
      const career = p.careerPathId;
      const analysis = _computeAnalysis(user, career);

      return {
        career: {
          _id: career._id,
          title: career.title,
          domain: career.domain,
          difficulty: career.difficulty,
          demand: career.demand,
          estimatedTimeToBridge: career.estimatedTimeToBridge,
        },
        matchScore: analysis.matchScore,
        gapCount: analysis.gapCount,
        progress: {
          percentComplete: p.percentComplete,
          completedSkillCount: p.completedSkills.length,
          totalRequiredSkillCount: career.requiredSkills.length,
        },
        savedAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });
};

const toggleSkill = async (userId, careerPathId, skillId) => {
  const career = await CareerPath.findById(careerPathId);
  if (!career) throw new ApiError(404, 'Career path not found');

  const isRequired = career.requiredSkills.some(
    rs => rs.skillId.toString() === skillId
  );
  if (!isRequired) {
    throw new ApiError(400, 'Skill is not required for this career path');
  }

  let progress = await UserProgress.findOne({ userId, careerPathId });
  if (!progress) {
    progress = new UserProgress({ userId, careerPathId, completedSkills: [], percentComplete: 0 });
  }

  const completedSet = new Set(progress.completedSkills.map(s => s.toString()));
  if (completedSet.has(skillId)) {
    completedSet.delete(skillId);
  } else {
    completedSet.add(skillId);
  }

  progress.completedSkills = [...completedSet];
  progress.percentComplete = career.requiredSkills.length > 0
    ? Math.round((progress.completedSkills.length / career.requiredSkills.length) * 100)
    : 0;

  await progress.save();
  return progress.toObject({ versionKey: false });
};

module.exports = { getCareerBrief, getMyRoadmaps, toggleSkill };
