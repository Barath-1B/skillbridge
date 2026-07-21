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

// Eligibility keys off skill fit (weightedScore), NOT the personality-inflated
// matchScore — a good OCEAN match alone must not make a zero-skill career eligible.
const ELIGIBILITY_THRESHOLD = 20;

// Experience/difficulty ordinal scales for the experience-fit modifier.
const EXPERIENCE_INDEX = { student: 0, '0-1yr': 1, '1-3yr': 2, '3+yr': 3 };
const DIFFICULTY_INDEX = { beginner: 1, intermediate: 2, advanced: 3 };

// difficultyLevel → rough hours to working proficiency (fallback when a skill
// has no explicit learningHours). ponytail: coarse buckets, refine if a real
// time-to-proficiency dataset ever exists.
const DIFFICULTY_HOURS = { beginner: 30, intermediate: 80, advanced: 150 };

const PRIORITY_SEVERITY = { high: 'critical', medium: 'important', low: 'niceToHave' };

/**
 * Returns OCEAN modifier in percentage points (-5 to +10).
 * Computed from mean absolute deviation between user scores and domain ideal.
 * 0 deviation → +10 pts; 50+ deviation → -5 pts (linear interpolation).
 */
const computeOceanModifier = (userOcean = {}, domain) => {
  const ideal = DOMAIN_OCEAN_PROFILES[domain];
  if (!ideal) return 0;

  const totalDeviation = OCEAN_TRAITS.reduce((sum, trait) => {
    return sum + Math.abs((userOcean[trait] || 50) - ideal[trait]);
  }, 0);

  const avgDeviation = totalDeviation / OCEAN_TRAITS.length;
  const modifier = 10 - (avgDeviation / 50) * 15;
  return Math.round(Math.max(-5, Math.min(10, modifier)));
};

// Fraction of required certs the user holds → up to +5 points.
const computeCertBonus = (userCertifications, requiredCerts) => {
  if (!requiredCerts || requiredCerts.length === 0) {
    return { points: 0, matched: 0, total: 0 };
  }
  const held = new Set(userCertifications.map(c => c.toLowerCase()));
  const matched = requiredCerts.filter(c => held.has(c.toLowerCase())).length;
  return { points: Math.round((matched / requiredCerts.length) * 5), matched, total: requiredCerts.length };
};

// Compares seniority to career difficulty. Stretch (career harder than
// experience) → small penalty; aligned → slight boost; overqualified → neutral + flag.
const computeExperienceFit = (experience, difficulty) => {
  if (!experience || !difficulty) return { points: 0, note: null };
  const gap = DIFFICULTY_INDEX[difficulty] - EXPERIENCE_INDEX[experience];
  if (gap >= 2) return { points: -3, note: 'Significant stretch for your experience level' };
  if (gap === 1) return { points: -1, note: 'A stretch for your experience level' };
  if (gap <= -2) return { points: 0, note: 'Comfortably within your experience level' };
  return { points: 1, note: 'Well matched to your experience level' };
};

// Boosts careers whose domain/title intersects the user's stated interests.
const computeInterestBoost = (interests, domain, title) => {
  if (!interests || interests.length === 0) return { points: 0, matched: [] };
  const haystack = `${domain} ${title}`.toLowerCase();
  const matched = interests.filter(i => {
    const t = i.toLowerCase().trim();
    return t && (haystack.includes(t) || t.includes(domain.toLowerCase()));
  });
  return { points: Math.min(5, matched.length * 3), matched };
};

/**
 * Analyzes a user profile against one career path. Pure — no DB/IO.
 *
 * @param {object} userProfile - {
 *   skillIdSet: Set<string>, skillNameSet: Set<string> (lowercased),
 *   certifications: string[], ocean: {O,C,E,A,N}, experience: string, interests: string[]
 * }
 * @param {object} careerData - {
 *   domain, title, difficulty, demand,
 *   requiredSkills: [{ id, name, category, weight, priority, relatedSkills:[{name,similarity}] }],
 *   requiredCerts: string[]
 * }
 * @returns {object} Gap analysis result with score breakdown, explanation and confidence.
 */
const analyzeCareerPath = (userProfile, careerData) => {
  const {
    skillIdSet,
    skillNameSet = new Set(),
    certifications = [],
    ocean = {},
    experience,
    interests = [],
  } = userProfile;
  const { domain, title = '', difficulty, requiredSkills, requiredCerts } = careerData;

  const matchedSkills = [];
  const partialSkills = [];
  const missingSkills = [];
  let creditedWeightSum = 0;
  let totalWeightSum = 0;

  requiredSkills.forEach(({ id, name, category, weight, priority, relatedSkills = [] }) => {
    totalWeightSum += weight;
    const entry = { id, name, category, weight, priority };

    if (skillIdSet.has(id)) {
      matchedSkills.push(entry);
      creditedWeightSum += weight;
      return;
    }

    // Adjacency: best related skill the user actually holds → partial credit.
    let best = null;
    relatedSkills.forEach(({ name: relName, similarity }) => {
      if (skillNameSet.has(relName.toLowerCase()) && (!best || similarity > best.similarity)) {
        best = { via: relName, similarity };
      }
    });

    if (best) {
      creditedWeightSum += best.similarity * weight;
      partialSkills.push({ ...entry, via: best.via, similarity: best.similarity });
    } else {
      missingSkills.push(entry);
    }
  });

  const weightedScore = totalWeightSum > 0
    ? Math.round((creditedWeightSum / totalWeightSum) * 100)
    : 0;

  const oceanBonus = computeOceanModifier(ocean, domain);
  const cert = computeCertBonus(certifications, requiredCerts);
  const expFit = computeExperienceFit(experience, difficulty);
  const interest = computeInterestBoost(interests, domain, title);

  const matchScore = Math.max(
    0,
    Math.min(100, weightedScore + oceanBonus + cert.points + expFit.points + interest.points)
  );

  // Gap severity buckets from the (previously unused) priority field.
  const gapsBySeverity = { critical: [], important: [], niceToHave: [] };
  missingSkills.forEach(s => {
    gapsBySeverity[PRIORITY_SEVERITY[s.priority] || 'important'].push(s.name);
  });

  const explanation = [
    `Skills ${weightedScore}% (${matchedSkills.length}/${requiredSkills.length} matched)`,
  ];
  if (partialSkills.length > 0) {
    explanation.push(
      `Adjacency credit: ${partialSkills.map(p => `${p.via}→${p.name} (${Math.round(p.similarity * 100)}%)`).join(', ')}`
    );
  }
  if (oceanBonus !== 0) explanation.push(`Personality fit ${oceanBonus > 0 ? '+' : ''}${oceanBonus}`);
  if (cert.total > 0) explanation.push(`Certifications ${cert.matched}/${cert.total} +${cert.points}`);
  if (expFit.points !== 0 && expFit.note) explanation.push(`${expFit.note} (${expFit.points > 0 ? '+' : ''}${expFit.points})`);
  if (interest.points > 0) explanation.push(`Interest match +${interest.points}`);
  if (gapsBySeverity.critical.length > 0) explanation.push(`Missing critical: ${gapsBySeverity.critical.join(', ')}`);

  const confidence = computeConfidence({
    weightedScore,
    skillCount: skillIdSet.size,
    ocean,
    experience,
    interests,
  });

  return {
    matchScore,
    weightedScore,
    isEligible: weightedScore >= ELIGIBILITY_THRESHOLD,
    breakdown: {
      oceanBonus,
      certBonus: cert.points,
      experienceFit: expFit.points,
      interestBoost: interest.points,
    },
    matchedSkills,
    partialSkills,
    missingSkills,
    gapCount: missingSkills.length,
    gapsBySeverity,
    certificationGap: (requiredCerts || []).filter(
      c => !certifications.map(x => x.toLowerCase()).includes(c.toLowerCase())
    ),
    explanation,
    ...confidence,
  };
};

// ponytail: heuristic confidence from signal completeness + margin to the
// eligibility threshold; real calibration needs outcome data we don't have.
const computeConfidence = ({ weightedScore, skillCount, ocean, experience, interests }) => {
  const reasons = [];
  const hasOcean = OCEAN_TRAITS.some(t => (ocean[t] ?? 50) !== 50);
  const hasSkills = skillCount >= 3;
  const hasExperience = !!experience;
  const hasInterests = interests.length > 0;

  if (!hasOcean) reasons.push('personality test not taken');
  if (!hasSkills) reasons.push('few skills on profile');
  if (!hasExperience) reasons.push('experience level not set');
  if (!hasInterests) reasons.push('no interests set');

  const signalCount = [hasOcean, hasSkills, hasExperience, hasInterests].filter(Boolean).length;
  const margin = Math.abs(weightedScore - ELIGIBILITY_THRESHOLD);
  if (margin < 10) reasons.push('score is near the eligibility cutoff');

  let confidence;
  if (signalCount >= 3 && margin >= 15) confidence = 'high';
  else if (signalCount >= 2) confidence = 'medium';
  else confidence = 'low';

  return { confidence, confidenceReasons: reasons };
};

module.exports = {
  analyzeCareerPath,
  computeOceanModifier,
  ELIGIBILITY_THRESHOLD,
  DIFFICULTY_HOURS,
};
