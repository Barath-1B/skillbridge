const User = require('../../models/user.model');
const CareerPath = require('../../models/career-path.model');
const ApiError = require('../../utils/ApiError');
const { analyzeCareerPath, ELIGIBILITY_THRESHOLD } = require('../../utils/gap-engine');

// Demand is a market signal, not a fit signal — it never changes matchScore.
// It only nudges the "best opportunity" ranking the UI can sort by.
const DEMAND_BOOST = { low: 0, medium: 2, high: 5 };

const runAnalysis = async (userId) => {
  const user = await User.findById(userId)
    .populate('currentSkills', 'name category tags')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const careerPaths = await CareerPath.find({})
    .populate('requiredSkills.skillId', 'name category relatedSkills difficultyLevel learningHours');

  const userProfile = {
    skillIdSet: new Set(user.currentSkills.map(s => s._id.toString())),
    skillNameSet: new Set(user.currentSkills.map(s => s.name.toLowerCase())),
    certifications: user.certifications || [],
    ocean: user.oceanScore || {},
    experience: user.experience,
    interests: user.interests || [],
  };

  const results = careerPaths.map(cp => {
    const requiredSkills = cp.requiredSkills
      .filter(rs => rs.skillId) // skip any broken refs
      .map(rs => ({
        id: rs.skillId._id.toString(),
        name: rs.skillId.name,
        category: rs.skillId.category,
        weight: rs.weight,
        priority: rs.priority,
        relatedSkills: rs.skillId.relatedSkills || [],
      }));

    const careerData = {
      domain: cp.domain,
      title: cp.title,
      difficulty: cp.difficulty,
      demand: cp.demand,
      requiredSkills,
      requiredCerts: cp.certifications,
    };

    const analysis = analyzeCareerPath(userProfile, careerData);

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
      // Separate "best opportunity" score = fit + bounded market-demand nudge.
      recommendedScore: Math.min(100, analysis.matchScore + (DEMAND_BOOST[cp.demand] || 0)),
    };
  });

  results.sort((a, b) => b.matchScore - a.matchScore);

  const eligibleCount = results.filter(r => r.isEligible).length;

  return {
    results,
    totalPaths: results.length,
    eligibleCount,
    eligibilityThreshold: ELIGIBILITY_THRESHOLD,
    userSkillCount: user.currentSkills.length,
    hasCompletedProfile: user.currentSkills.length > 0,
  };
};

module.exports = { runAnalysis };
