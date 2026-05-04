const User = require('../../models/user.model');
const CareerPath = require('../../models/career-path.model');
const ApiError = require('../../utils/ApiError');
const { analyzeCareerPath } = require('../../utils/gap-engine');

const runAnalysis = async (userId) => {
  const user = await User.findById(userId)
    .populate('currentSkills', 'name category tags')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const careerPaths = await CareerPath.find({})
    .populate('requiredSkills.skillId', 'name category');

  // Build a Set of the user's skill IDs (strings) for O(1) lookup
  const userSkillIdSet = new Set(
    user.currentSkills.map(s => s._id.toString())
  );

  const results = careerPaths.map(cp => {
    // Normalise requiredSkills into plain objects for the gap engine
    const requiredSkills = cp.requiredSkills
      .filter(rs => rs.skillId) // skip any broken refs
      .map(rs => ({
        id: rs.skillId._id.toString(),
        name: rs.skillId.name,
        category: rs.skillId.category,
        weight: rs.weight,
        priority: rs.priority,
      }));

    const careerData = {
      domain: cp.domain,
      requiredSkills,
      requiredCerts: cp.certifications,
    };

    const analysis = analyzeCareerPath(
      userSkillIdSet,
      user.certifications,
      user.oceanScore,
      careerData
    );

    return {
      careerPath: {
        _id: cp._id,
        title: cp.title,
        domain: cp.domain,
        description: cp.description,
        difficulty: cp.difficulty,
        demand: cp.demand,
        estimatedTimeToBridge: cp.estimatedTimeToBridge,
        phases: cp.phases,
        resources: cp.resources,
        advantages: cp.advantages,
        certifications: cp.certifications,
      },
      ...analysis,
    };
  });

  results.sort((a, b) => b.matchScore - a.matchScore);

  const eligibleCount = results.filter(r => r.matchScore >= 20).length;

  return {
    results,
    totalPaths: results.length,
    eligibleCount,
    userSkillCount: user.currentSkills.length,
    hasCompletedProfile: user.currentSkills.length > 0,
  };
};

module.exports = { runAnalysis };
