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

// Annotate each phase's skill strings with have/missing status and completion state.
// `status` reflects whether the user already possesses the skill (substring match against currentSkills).
// `completed` reflects whether the user has explicitly checked it off on the roadmap.
const _annotatePhases = (phases, userSkillNames, completedRoadmapItems = []) => {
  const userLower = new Set(userSkillNames.map(n => n.toLowerCase()));
  const completedKey = new Set(
    completedRoadmapItems.map(item => `${item.phase}::${item.skillName.toLowerCase()}`)
  );

  return phases.map(phase => ({
    phase: phase.phase,
    title: phase.title,
    milestoneMonths: phase.milestoneMonths,
    skills: phase.skills.map(skillName => {
      const lower = skillName.toLowerCase();
      const have =
        userLower.has(lower) ||
        [...userLower].some(s => lower.includes(s) || s.includes(lower));
      const completed = completedKey.has(`${phase.phase}::${lower}`);
      return { name: skillName, status: have ? 'have' : 'missing', completed };
    }),
  }));
};

const _totalRoadmapItems = (career) =>
  career.phases.reduce((sum, p) => sum + p.skills.length, 0);

const getCareerBrief = async (userId, careerPathId) => {
  const { user, career } = await _getContext(userId, careerPathId);

  const analysis = _computeAnalysis(user, career);
  const progress = await UserProgress.findOne({ userId, careerPathId });
  const completedRoadmapItems = progress ? progress.completedRoadmapItems : [];

  const annotatedPhases = _annotatePhases(
    career.phases,
    user.currentSkills.map(s => s.name),
    completedRoadmapItems
  );

  const totalRoadmapItems = _totalRoadmapItems(career);
  const completedRoadmapCount = completedRoadmapItems.length;
  const percentComplete = totalRoadmapItems > 0
    ? Math.round((completedRoadmapCount / totalRoadmapItems) * 100)
    : 0;

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
      percentComplete,
      completedSkillCount: completedRoadmapCount,
      totalRequiredSkillCount: totalRoadmapItems,
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

const toggleRoadmapItem = async (userId, careerPathId, phase, skillName) => {
  const career = await CareerPath.findById(careerPathId);
  if (!career) throw new ApiError(404, 'Career path not found');

  const phaseDef = career.phases.find(p => p.phase === phase);
  if (!phaseDef) throw new ApiError(400, `Phase ${phase} not found on this career path`);

  const matchingName = phaseDef.skills.find(
    s => s.toLowerCase() === String(skillName).toLowerCase()
  );
  if (!matchingName) {
    throw new ApiError(400, `Skill "${skillName}" is not part of phase ${phase}`);
  }

  let progress = await UserProgress.findOne({ userId, careerPathId });
  if (!progress) {
    progress = new UserProgress({
      userId,
      careerPathId,
      completedSkills: [],
      completedRoadmapItems: [],
      percentComplete: 0,
    });
  }

  const idx = progress.completedRoadmapItems.findIndex(
    item => item.phase === phase && item.skillName.toLowerCase() === matchingName.toLowerCase()
  );
  if (idx >= 0) {
    progress.completedRoadmapItems.splice(idx, 1);
  } else {
    progress.completedRoadmapItems.push({ phase, skillName: matchingName });
  }

  const total = _totalRoadmapItems(career);
  progress.percentComplete = total > 0
    ? Math.round((progress.completedRoadmapItems.length / total) * 100)
    : 0;

  await progress.save();
  return {
    completedRoadmapItems: progress.completedRoadmapItems,
    percentComplete: progress.percentComplete,
    completedSkillCount: progress.completedRoadmapItems.length,
    totalRequiredSkillCount: total,
  };
};

module.exports = { getCareerBrief, getMyRoadmaps, toggleSkill, toggleRoadmapItem };
