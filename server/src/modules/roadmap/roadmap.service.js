const CareerPath = require('../../models/career-path.model');
const UserProgress = require('../../models/user-progress.model');
const User = require('../../models/user.model');
const Skill = require('../../models/skill.model');
const ApiError = require('../../utils/ApiError');
const { analyzeCareerPath, DIFFICULTY_HOURS } = require('../../utils/gap-engine');

const SKILL_FIELDS = 'name category relatedSkills difficultyLevel learningHours';

const _getContext = async (userId, careerPathId) => {
  const [user, career] = await Promise.all([
    User.findById(userId).populate('currentSkills', SKILL_FIELDS).select('-password'),
    CareerPath.findById(careerPathId).populate('requiredSkills.skillId', SKILL_FIELDS),
  ]);

  if (!user) throw new ApiError(404, 'User not found');
  if (!career) throw new ApiError(404, 'Career path not found');

  return { user, career };
};

const _buildUserProfile = (user) => ({
  skillIdSet: new Set(user.currentSkills.map(s => s._id.toString())),
  skillNameSet: new Set(user.currentSkills.map(s => s.name.toLowerCase())),
  certifications: user.certifications || [],
  ocean: user.oceanScore || {},
  experience: user.experience,
  interests: user.interests || [],
});

const _computeAnalysis = (user, career) => {
  const requiredSkills = career.requiredSkills
    .filter(rs => rs.skillId)
    .map(rs => ({
      id: rs.skillId._id.toString(),
      name: rs.skillId.name,
      category: rs.skillId.category,
      weight: rs.weight,
      priority: rs.priority,
      relatedSkills: rs.skillId.relatedSkills || [],
    }));

  return analyzeCareerPath(_buildUserProfile(user), {
    domain: career.domain,
    title: career.title,
    difficulty: career.difficulty,
    demand: career.demand,
    requiredSkills,
    requiredCerts: career.certifications,
  });
};

// Look up the Skill docs behind each phase's skill-name strings so the roadmap
// can reuse the same adjacency/effort data the engine uses. Returns a
// lowercased-name → skill map.
const _resolveSkillMap = async (phases) => {
  const names = [...new Set(phases.flatMap(p => p.skills))];
  const skills = await Skill.find({ name: { $in: names } }).select(SKILL_FIELDS);
  const map = new Map();
  skills.forEach(s => map.set(s.name.toLowerCase(), s));
  return map;
};

const _effortHours = (skill) => {
  if (!skill) return null;
  if (typeof skill.learningHours === 'number') return skill.learningHours;
  return DIFFICULTY_HOURS[skill.difficultyLevel] || null;
};

// Annotate each phase's skills with have/partial/missing status, effort, and
// prerequisite flags — consistent with the engine's adjacency logic.
const _annotatePhases = (phases, userProfile, completedRoadmapItems = [], skillMap) => {
  const userLower = userProfile.skillNameSet;
  const completedKey = new Set(
    completedRoadmapItems.map(item => `${item.phase}::${item.skillName.toLowerCase()}`)
  );

  // Names appearing in earlier phases, for foundation/prerequisite detection.
  const seenEarlier = new Set();

  return phases.map(phase => {
    const annotated = {
      phase: phase.phase,
      title: phase.title,
      milestoneMonths: phase.milestoneMonths,
      skills: phase.skills.map(skillName => {
        const lower = skillName.toLowerCase();
        const skill = skillMap.get(lower);
        const related = skill ? skill.relatedSkills || [] : [];

        let status = 'missing';
        let via = null;
        if (userLower.has(lower)) {
          status = 'have';
        } else {
          const adj = related.find(r => userLower.has(r.name.toLowerCase()));
          if (adj) { status = 'partial'; via = adj.name; }
        }

        // Foundation flag: this skill relates to an earlier-phase skill the
        // user doesn't yet hold — learn that first.
        let needsFoundation = null;
        if (status !== 'have') {
          const found = related.find(
            r => seenEarlier.has(r.name.toLowerCase()) && !userLower.has(r.name.toLowerCase())
          );
          if (found) needsFoundation = found.name;
        }

        return {
          name: skillName,
          status,
          via,
          needsFoundation,
          effortHours: _effortHours(skill),
          completed: completedKey.has(`${phase.phase}::${lower}`),
        };
      }),
    };
    phase.skills.forEach(s => seenEarlier.add(s.toLowerCase()));
    return annotated;
  });
};

const _totalRoadmapItems = (career) =>
  career.phases.reduce((sum, p) => sum + p.skills.length, 0);

const getCareerBrief = async (userId, careerPathId) => {
  const { user, career } = await _getContext(userId, careerPathId);

  const analysis = _computeAnalysis(user, career);
  const progress = await UserProgress.findOne({ userId, careerPathId });
  const completedRoadmapItems = progress ? progress.completedRoadmapItems : [];

  const skillMap = await _resolveSkillMap(career.phases);
  const annotatedPhases = _annotatePhases(
    career.phases,
    _buildUserProfile(user),
    completedRoadmapItems,
    skillMap
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
