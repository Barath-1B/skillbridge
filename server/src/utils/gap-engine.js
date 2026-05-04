// Ideal OCEAN trait profiles per career domain (target scores 0-100).
// Used to compute personality alignment modifier (-5 to +10 percentage points).
const DOMAIN_OCEAN_PROFILES = {
  'Artificial Intelligence': { O: 85, C: 80, E: 45, A: 50, N: 30 },
  'Web Development':         { O: 70, C: 70, E: 65, A: 60, N: 35 },
  'Data & Analytics':        { O: 65, C: 85, E: 50, A: 60, N: 30 },
  'Healthcare Tech':         { O: 60, C: 80, E: 60, A: 80, N: 40 },
  'FinTech':                 { O: 55, C: 90, E: 55, A: 45, N: 35 },
  'Security':                { O: 75, C: 85, E: 40, A: 40, N: 55 },
  'Hardware/IoT':            { O: 70, C: 85, E: 35, A: 45, N: 30 },
  'Aerospace & Defense':     { O: 75, C: 95, E: 40, A: 50, N: 25 },
};

const OCEAN_TRAITS = ['O', 'C', 'E', 'A', 'N'];

/**
 * Returns OCEAN modifier in percentage points (-5 to +10).
 * Computed from mean absolute deviation between user scores and domain ideal.
 * 0 deviation → +10 pts; 50+ deviation → -5 pts (linear interpolation).
 */
const computeOceanModifier = (userOcean, domain) => {
  const ideal = DOMAIN_OCEAN_PROFILES[domain];
  if (!ideal) return 0;

  const totalDeviation = OCEAN_TRAITS.reduce((sum, trait) => {
    return sum + Math.abs((userOcean[trait] || 50) - ideal[trait]);
  }, 0);

  const avgDeviation = totalDeviation / OCEAN_TRAITS.length;
  const modifier = 10 - (avgDeviation / 50) * 15;
  return Math.round(Math.max(-5, Math.min(10, modifier)));
};

/**
 * Analyzes user profile against one career path.
 *
 * @param {Set<string>}  userSkillIdSet      - Set of user's skill ID strings
 * @param {string[]}     userCertifications  - User's certification names
 * @param {object}       userOcean           - { O, C, E, A, N } scores 0-100
 * @param {object}       careerData          - Prepared career path data (plain object)
 * @returns {object}     Gap analysis result
 */
const analyzeCareerPath = (userSkillIdSet, userCertifications, userOcean, careerData) => {
  const { domain, requiredSkills, requiredCerts } = careerData;

  const matchedSkills = [];
  const missingSkills = [];
  let matchedWeightSum = 0;
  let totalWeightSum = 0;

  requiredSkills.forEach(({ id, name, category, weight, priority }) => {
    totalWeightSum += weight;
    const entry = { id, name, category, weight, priority };

    if (userSkillIdSet.has(id)) {
      matchedSkills.push(entry);
      matchedWeightSum += weight;
    } else {
      missingSkills.push(entry);
    }
  });

  const weightedScore = totalWeightSum > 0
    ? Math.round((matchedWeightSum / totalWeightSum) * 100)
    : 0;

  const oceanBonus = computeOceanModifier(userOcean, domain);

  const userCertLower = new Set(userCertifications.map(c => c.toLowerCase()));
  const certificationGap = (requiredCerts || []).filter(
    c => !userCertLower.has(c.toLowerCase())
  );

  const matchScore = Math.max(0, Math.min(100, weightedScore + oceanBonus));

  return {
    matchScore,
    weightedScore,
    oceanBonus,
    matchedSkills,
    missingSkills,
    gapCount: missingSkills.length,
    certificationGap,
  };
};

module.exports = { analyzeCareerPath, computeOceanModifier };
